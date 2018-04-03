// A $( document ).ready() block.

/*global $*/
/*global sessionStorage*/

$( document ).ready(function() {
    $("#accordion").accordion({
        active: 'none'
    });
    
    //a prelisted established tag list
    
    var tagList = ["woof", "dogs", "cats", "sloths"];
    var htmlTags = "";
    $( function() {
        
        if (sessionStorage.tagList === null){
            appendTosessionStorage('tagList', tagList)
        }
        //var tags = tagList.split('#');
        //Console.log(tags);
        //var splitTagList = sessionStorage.tagList.split("#")
        for (var t = 0; t < tagList.length; t++)
            {
                htmlTags += "<h3>" + tagList[t] + "</h3><div><p> </p></div>";
            }
        
        document.getElementById("accordion").innerHTML = htmlTags;
        
        //the code below isn't working
        if (sessionStorage.citation === null)
            document.getElementById("sources").innerHTML = "<h3>Sources</h3><hr>" + sessionStorage.citation;
            
        $('#accordion').accordion('refresh');
        
        
    } );
    console.log( "ready!" );
    
    var responseHTML = document.createElement("body");

    var myButton = document.getElementById("getURL");
    var myText = document.getElementById("selectedText");
    var articleText = document.getElementById("article");
    var bookCite = document.getElementById("bookCite");
    var makeTag = document.getElementById("quoteCreate");
    var tagInput = document.getElementById("quoteTags");
    
    //scrap website
    var modal = document.getElementById('myModal');
    var urlButton = document.getElementById("urlButton");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    var quoteList = [];
    
    // When the user clicks on the button, open the modal 
    urlButton.onclick = function() {
        modal.style.display = "block";
        var valFromTextField = document.getElementById("textfieldInfo").value;
        //console.log(valFromTextField);
        scrapePage(valFromTextField);
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    //myButton.addEventListener('click', readFile("articles/article1.txt"), false);
    //myButton.addEventListener('click', console.log("What"), false);
    articleText.addEventListener('click', getSelectionText, false);
    //bookCite.addEventListener('click', console.log("WHAT"), false)
    
    bookCite.onmouseup = function() {
        makeBook();
    }
    
    makeTag.onmouseup = function() {
        createQuote();
    }
    
    
    function getSelectionText() {
        console.log("testtesttest");
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        
        myText.textContent = "" + text;
        return text;
    }
    
    function createQuote(){
        
    var quote = myText.textContent;
    var inputTag = document.getElementById("quoteTags").value;
    var listofTag = inputTag.split('#')
    listofTag.reverse();
    listofTag.pop();
    var success = quoteList.push([quote, listofTag]);
    console.log("Success: " + success);
        
    // add to tag list
    for (var i = 0; i < listofTag.length; i++){
        console.log("String: " + listofTag[i]);
        if (tagList.indexOf(listofTag[i]) == -1){
            tagList.push(listofTag[i]);
        }
        
    }
        
    // print quote
    var newhtmlTags = "";
    for (var t = 0; t < tagList.length; t++)
    {
       newhtmlTags += "<h3>" + tagList[t] + "</h3><div>";
       for (var q = 0; q < quoteList.length; q++){
            for (var r = 0; r < quoteList[q][1].length; r++)
                if (quoteList[q][1].indexOf(tagList[t]) != -1){
                    console.log("repeat");    
                    newhtmlTags+= "<p> Quote: " + quoteList[q][0] + " </p>";
                    r = quoteList[q][1].length;
                }
       }
       newhtmlTags+= "</div>";
    }
    document.getElementById("accordion").innerHTML = newhtmlTags;
    $('#accordion').accordion('refresh');
        
    }
   
    //TESTING getting the webpage scrape right now
    
    function scrapePage(urlPage){
       console.log("test");
    }
    
    //
    
    function makeBook(){
        console.log("makeBook");
        /*
        When a book has multiple authors, order the authors in the same way they
        are presented in the book. The first given name appears in 
        last name, first name format; subsequent author names appear in 
        first name last name format.

        Gillespie, Paula, and Neal Lerner. 
        The Allyn and Bacon Guide to Peer Tutoring. Allyn and Bacon, 2000.
        
        If there are three or more authors, list only the first author followed 
        by the phrase et al. (Latin for "and others") in place of the subsequent
        authors' names. (Note that there is a period after “al” in “et al.” Also
        note that there is never a period after the “et” in “et al.”).

        Wysocki, Anne Frances, et al. 
        Writing New Media: Theory and Applications for Expanding the 
        Teaching of Composition. Utah State UP, 2004. 
        */
        
        var name = document.getElementById("Name").value;
        var author = "";
        
        var match = name.split(';');
        console.log(match.length);
        console.log(match);
        if (match.length >= 3){
            match.reverse();
            author += match.pop() + " et al.";
        }
        else{
            while(match.length != 0){
                
                console.log("one");
                
                if(match.length != 1){
                    if (author.length == 0)
                        author = match.pop() + ", ";
                    else
                        author += match.pop() + ", ";
                }
                else{
                    if (author.length == 0)
                        author = match.pop() + ". ";
                    else
                        author += match.pop() + ". ";
                }
            }
            /*
            for (var i = 0; i < match.length; i++)
            {
                if (i != match.length)
                    author += match[i] + ", ";
                else
                    author += match[i] + ". ";
                    
                
            }*/
        }
        
        //Console.log("AUTHOR: " + author);
        var title = " " + document.getElementById("bookName").value + ". ";
        var publisher = document.getElementById("cityName").value + ": " + document.getElementById("publisherName").value + ", " + document.getElementById("yearPub").value + ". ";
        var bookCitation;
        //for (var str in author)
        //    bookCitation += author;
        bookCitation = author + "<i>" + title + "</i>" + publisher;
        
        console.log("author " + author);
        appendTosessionStorage('citation', "<p>" + bookCitation + "</p><hr>");
        
        document.getElementById("citiationText").innerHTML = bookCitation;
        document.getElementById("sources").innerHTML = "<h3>Sources</h3><hr>" + sessionStorage.citation;
    }
    
    function appendTosessionStorage(store, element){
        var old = sessionStorage.getItem(store);
        if (old === null)
            old = "";
        sessionStorage.setItem(store, old + element);
        console.log(store + ": " + sessionStorage.getItem(store));
    }
        
      $( function() {
        var icons = {
            header: "ui-icon-circle-arrow-e",
            activeHeader: "ui-icon-circle-arrow-s"
        };
        $( "#accordion" ).accordion({
          icons: icons
        });
        $( "#toggle" ).button().on( "click", function() {
          if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
            $( "#accordion" ).accordion( "option", "icons", null );
          } else {
            $( "#accordion" ).accordion( "option", "icons", icons );
          }
        });
      } );
      
      
    $( "#autocomplete" ).autocomplete({
        //source: tagList.split('#')
        source: tagList
    });
});


