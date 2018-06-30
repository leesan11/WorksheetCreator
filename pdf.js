$(".generate").addEventListener("click",".create-worksheet",function(){
  let pdfKIT = require("pdfkit");
  let doc = new pdfKIT();
  let fs = require("fs");
  let blobStream  = require('blob-stream');
  let template = require("./template.js");
  window.numb=0;
  window.store=[];
  let stream = doc.pipe(blobStream());
  //change data attribute of button
  $('.regenerate').attr('data',$(this).attr('data'));


  switch ($(this).attr('data')){
    case 'order-decimals':
        return decimalWorksheet();
    default:
        break;

  };

  function decimalWorksheet(){
  //adding content
  //TO DO: Add to MTFTW website somehow...
  //template
  
  template.createTitle(doc,"Ordering Decimals Worksheet");
  
  template.addNameDate(doc);
  //Template end
  doc.fontSize(12);
  doc.text("Order from Least to Greatest");
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
  for(i=0;i<5;i++){
    arr.push((Math.random()).toFixed(2));
  }
  window.numb++;
  return  ["\n"+window.numb+") "+arr.join(" ,"),createAnswer(arr)+"\n"];
  
  }
  
  function createAnswer(arr){
    let t=[];
    for(items of arr){
      t.push(items);
    }
    t.sort((a,b)=>{return b-a});
    return "Answer: "+t.join(" ,");
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


  });
