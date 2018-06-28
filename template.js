let template = {

    createTitle : function(doc,title){
        doc.fontSize(20).text(title,{
            align:"center",
            underline:true,
            height:300,
          });
    },

    addNameDate : function(doc){
        doc.fontSize(14).moveDown();
      doc.fontSize(14).text("Name:______________                                       Date:_______________");
      doc.moveDown().moveDown();
      doc.fontSize(12);
    },

    addBorder : function(doc){
        doc.rect(10,10,590,770).stroke();
    },

    addLogo : function(doc){
        doc.fontSize(6);
        doc.fillColor("grey");
        doc.text("Copyright SL",500,700,{
            lineBreak:false
    });
    }

};

module.exports = template;