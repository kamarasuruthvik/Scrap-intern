let selectedFile;
// console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data=[];


document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
        //  console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
            //   console.log(rowObject);
             var error= validateObject(rowObject);
             if(error==='Success!'){
              makeTable(rowObject);
             }

            //   document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4)
         });
        }
    }
});
function validateObject(info){
    var errorMessage=document.getElementById('error-container');
    var currentError=null;
    console.log(info);
    try{
        for(var i=0;i<info.length;i++){
        if(info[i]['linkedIn page link']===undefined || info[i]['Company Name']===undefined)
            throw "Please enter the fields correctly. If facing difficulty then use the sample template provided above and fill it!";
        }
        throw('Success!');
    }
    catch(error){
        errorMessage.innerHTML=error;
        currentError= error;
    }
    return currentError;
}
function makeTable(info){
    myTable=document.getElementById('myTable');
    inter=document.getElementById('inner')
    console.log(info);
    inter.innerHTML=`<tr>
    <th scope="col">#</th>
    <th scope="col">Company Name</th>
    <th scope="col">Linkedin link</th>
  </tr>`
    for(let i=0;i<info.length;i++){
        myTable.innerHTML+=`<tr>
        <th scope="row">${i+1}</th>
        <td>
        ${info[i]['Company Name']}
        </td>
        <td><a href="${info[i]['linkedIn page link']}">
        ${info[i]['linkedIn page link']}
        <a>
        </td>
        </tr>`
        console.log(info[i]['Company Name']);
    }
}
