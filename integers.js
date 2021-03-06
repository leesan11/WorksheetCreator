$(".generate").addEventListener("click",".create-worksheet-integer-subtraction",function(){
    let pdfKIT = require("pdfkit");
    let doc = new pdfKIT();
    let fs = require("fs");
    let blobStream  = require('blob-stream');
    let template = require("./template.js");
    window.numb=0;
    window.store=[];
    let stream = doc.pipe(blobStream());
    
function orderIntegersWorksheet(){
    //adding content
    //TO DO: Add to MTFTW website somehow...
    //template
    
    template.createTitle(doc,"Ordering Integers Worksheet");
    
    template.addNameDate(doc);
    //Template end
    doc.fontSize(12);
    doc.text("Order following from least to greatest: ");
    for(let i=0;i<10;i++){
      appendQuestion();
    }
    //add a logo
    template.addLogo(doc);
    //add a border
    template.addBorder(doc);
    
    createAnswerKey();
    template.addLogo(doc);
    
    //add a border
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
    let arr=[];
    //generate random integer
    let first = Math.floor(Math.random()*100-50);
    let second = Math.floor(Math.random()*100-50);
    let equation = first + ' - ' + second + ' = ';
    window.numb++;
    return  ["\n"+window.numb+") "+ equation ,createAnswer(equation)+"\n"];
    
    }
    
    function createAnswer(equation){
      
      return "Answer: " + eval(equation.substring(0,equation.length-2));
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
      let iframe = document.getElementById("i")
      iframe.src = url;
      y = (iframe.contentWindow || iframe.contentDocument);

      if (!y.document.body.style.backgroundColor) {
        y.document.body.innerHTML = "<h1 style='text-align:center'>You are using a mobile browser.</h1> <h3 style='text-align:center'>Your download should have initiated</h3>";
        y.close();
      }
    });
}
    });
