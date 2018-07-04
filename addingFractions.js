function subtractingFractionsWorksheet(){
    
    template.createTitle(doc,"Subtracting Fractions Worksheet");
    
    template.addNameDate(doc);
    //Template end
    doc.fontSize(10);
    doc.text("Calculate the following: ");
    for(let i=0;i<8;i++){
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
        continued:true
      });
      doc.text(arr[1],{
        underline:true,
        continued:true
      });
      doc.text(' - ',{
        underline:false,
        continued:true
      });
      doc.text(arr[2],{
        underline:true,
        continued:true
      });
      doc.text(arr[3],{
        underline:false
      });
      doc.fillColor("white")
      doc.text(arr[4][0],{
        continued:true,
      })
      doc.text(arr[4][1],{
        continued:true,
        underline:true
      });
      doc.text(arr[4][2],{
        continued:false,
        underline:false
      });
      doc.moveDown();
    }
    
    function createQuestion(){
    let arr=[];
    //generate random integer
    let firstNumerator = Math.floor(Math.random()*9+1);
    let firstDenominator = Math.floor(Math.random()*9+1);
    let secondNumerator = Math.floor(Math.random()*9+1);
    let secondDenominator = Math.floor(Math.random()*9+1);

    let equation ='\n' + '    ' + firstDenominator + '    ' + secondDenominator;
    window.numb++;
    return  ["\n"+window.numb+") ",firstNumerator,secondNumerator,equation,createAnswer(firstNumerator,firstDenominator,secondNumerator,secondDenominator)];
    
    }
    
    function createAnswer(firstNumerator,firstDenominator,secondNumerator,secondDenominator){
      //find lowest common multiple between first denominator and second denominator
      let multiples = [];
      let lcm;
      let firstFactor,secondFactor;
      let firstNum,secondNum,answerNumerator;
      if(firstDenominator > secondDenominator){
        for(let i=1; i <= secondDenominator; i++){
          multiples.push(firstDenominator*i);
        }
        for(items of multiples){
          if(items%secondDenominator==0){
            lcm = items;
          }
        };

      }else{
        for(let i=1; i <= firstDenominator; i++){
          multiples.push(secondDenominator*i);
        }
        for(items of multiples){
          if(items%firstDenominator==0){
            lcm = items;
          }
        };
      };

      firstFactor = lcm/firstDenominator;
      secondFactor = lcm/secondDenominator;
      firstNum = firstFactor * firstNumerator;
      secondNum = secondFactor * secondNumerator;

      answerNumerator = firstNum - secondNum;

      return ["Answer: ",answerNumerator,'\n              ' + lcm];
    }
    
    function createAnswerKey(){
      doc.fillColor("black");
      doc.addPage();
      doc.fontSize(14).text("Answer Key",{
        align:"center",
        underline:true,
      });
      
      doc.fontSize(9);
      for(items of window.store){
        doc.fillColor("black");
        doc.text(items[0],{
          continued:true
        });
        doc.text(items[1],{
          underline:true,
          continued:true
        });
        doc.text(' + ',{
          underline:false,
          continued:true
        });
        doc.text(items[2],{
          underline:true,
          continued:true
        });
        doc.text(items[3],{
          underline:false
        });
        doc.moveDown();
        doc.fillColor("red");
        doc.text(items[4][0],{
          continued:true,
        })
        doc.text(items[4][1],{
          continued:true,
          underline:true
        });
        doc.text(items[4][2],{
          continued:false,
          underline:false
        });
        doc.moveDown();
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
