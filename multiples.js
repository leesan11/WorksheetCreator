function findingMultiplesWorksheet(){

    template.createTitle(doc,"Finding Multiples Worksheet");
    
    template.addNameDate(doc);
    //Template end
    doc.fontSize(12);
    doc.text("Find five multiples of the following: ");
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
    let number = Math.floor(Math.random()*100)+1;
    
    let equation = number + ' : ';
    window.numb++;
    return  ["\n"+window.numb+") "+ equation ,createAnswer(equation)+"\n"];
    
    }
    
    function createAnswer(equation){
      let multiples = [];
      let number = (equation.substring(0,equation.length-3)).trim();
      let number = parseInt(number);

      for(i=1;i<6;i++){
          multiples.push(i*number);
      }
      let str = multiples.join(", ");


      return "Answer: " + str;
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