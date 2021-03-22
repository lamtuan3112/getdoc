const Sequelize = require("sequelize");
const Employee = require("../config/database").employee;
const fs = require("fs");

exports.getPriceList = async (req, res) => {
  var JSZip = require('jszip');
  var Docxtemplater = require('docxtemplater');
  var fs = require('fs');
  var path = require('path');
  //đọc fil word và fill data
  //Load the docx file as a binary
  var content = fs
      .readFileSync(path.resolve(__dirname, 'UyQuyen.docx'), 'binary');

  var zip = new JSZip(content);

  var doc = new Docxtemplater();
  doc.loadZip(zip);

  doc.setData({
      name:'Nghiêm Thị Chung',
      idNo:'031082000029'
  });

  try {
      doc.render()
  }
  catch (error) {
      var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
      }
      console.log(JSON.stringify({error: e}));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
  }

  var buf = doc.getZip()
              .generate({type: 'nodebuffer'});
  fs.writeFileSync(path.resolve(__dirname, 'UyQuyen1.docx'), buf);
  res.status(200).send({
            success: true,
            msg: "ghi thanh cong",
  });
};