function orderIntegersWorksheet(){
 //adding content
    //TO DO: Add to MTFTW website somehow...
    //template
    template.createTitle(doc,"Ordering Integers Worksheet");
    
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
      arr.push(Math.floor((Math.random()*100)-50));
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
      let iframe = document.getElementById("i")
      iframe.src = url;
      y = (iframe.contentWindow || iframe.contentDocument);

      if (!y.document.body.style.backgroundColor) {
        y.document.body.innerHTML = "<h1 style='text-align:center'>You are using a mobile browser.</h1> <h3 style='text-align:center'>Your download should have initiated</h3>";
        y.close();
      };

    });
}