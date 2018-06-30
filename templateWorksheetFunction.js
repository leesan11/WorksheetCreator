//change functionName
function functionName(title,promptQuestion){
    //title is title of first page (e.g. adding integers) [STR]
    //prompt Question is overarching question for all questions. (e.g. solve, calculate, find x) [STR]
    template.createTitle(doc,title);
    
    template.addNameDate(doc);
    doc.fontSize(12);
    doc.text(promptQuestion);
    for(let i=0;i<10;i++){
      appendQuestion();
    }

    template.addLogo(doc);
 
    template.addBorder(doc);
    
    createAnswerKey();
    template.addLogo(doc);
    
    template.addBorder(doc);
    
    function appendQuestion(){
      let arr=createQuestion();
      (window.store).push(arr);
      doc.fillColor("black");
      doc.text(arr[0],{
      });
      doc.fillColor("white")
      doc.text(arr[1],{
      })
      doc.moveDown();
    }
    
    function createQuestion(){
        //=============================================================================Modify Here
    //logic for question. question is a string
    let question;
    window.numb++;
    return  ["\n"+window.numb+") "+question,createAnswer(question)+"\n"];
    
    }
    
    function createAnswer(arr){
        //==============================================================================Modify Here
      //logic for answer. Answer is a string.
      let answer;
      return "Answer: "+answer;
    }
    
    function createAnswerKey(){
      doc.fillColor("black");
      doc.addPage();
      doc.fontSize(20).text("Answer Key",{
        align:"center",
        underline:true,
      });
      doc.fontSize(12);
      for(items of window.store){
        doc.fillColor("black");
        doc.text(items[0]);
        doc.moveDown();
        doc.fillColor("red");
        doc.text(items[1]);
      };
    
    };
   
    // finalize the PDF and end the stream
    doc.end();
    
    stream.on('finish', function(){
      
      url = stream.toBlobURL('application/pdf')
      document.getElementById("i").src=url;
    });
  };
  