var xhr = new XMLHttpRequest();
  var prcAddress = '0xd6D3f2AD6bbeEcD62E348e077C791eFB8A3b82B1';
  function productRegister() {
    var prcInstance;
    var productName = $("#productNameA").val();
    var productCode = $("#productCodeA").val();
    var rawMaterials = $("#rawMaterialsA").val();
    var newProduct = {
        productname: productName,
        productCode: productCode,
        rawmaterials: rawMaterials
    }
    xhr.open('POST','/regproduct',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
      console.log(xhr.responseText);
    }
    xhr.send(JSON.stringify(newProduct));
        console.log("Send Successful waiting ")
        $("#productNameA").val('');
        $("#productCodeA").val('');
        $("#rawMaterialsA").val('');
  }
  function materialRegister() {
    var prcInstance;
    var materialName = $("#materialNameA").val();
    var materialCode = $("#materialCodeA").val();
    var newMaterial = {
        materialname: materialName,
        materialcode: materialCode,
    }
    xhr.open('POST','/regmaterial',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
      console.log(xhr.responseText);
    }
    xhr.send(JSON.stringify(newMaterial));
        console.log("Send Successful waiting ")
        $("#materialNameA").val('');
        $("#materialCodeA").val('');
  }


// All registered products of the platform
function getAllRegister() {
let products = [];
  xhr.open('GET','/showProduct');
  xhr.send();
 xhr.onload = function()
     {
         //console.log(xhr.responseText);
         products = JSON.parse(xhr.responseText);
         console.log(products);
         showAllRegister(products);
         //console.log(products)
     }
  //return products;
}

// Show all registered products on the page
function showAllRegister(list) {
      console.log(list)
    $("#productListA").html('');
    list.forEach(function(item, index) {
      $("#productListA").append("<tr><td>" + item.id + "</td><td>" + item.code + "</td><td>" + item.name + "</td><td>" + item.materials + "</td><td>" + item.owner + "</td><td>" + item.addr + "</td><td>" + item.time + "</td></tr>");
    });
  }
  function getPlantformInfo() {
    $("#plantformAddressA").html(prcAddress);
  }
  function addPRCUser() {
    var userAddress = $("#userAddressA").val();
    var newUser =
    {
        useraddress : userAddress
    }
    xhr.open('POST','/createuser',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
      alert(xhr.responseText);
    }
    xhr.send(JSON.stringify(newUser));
        console.log("Waiting ")
      $("#userAddressA").val('');
  }
  function removePRCUser() {
    var userAddress = $("#userAddressA").val();
    var newUser =
    {
        useraddress : userAddress
    }
    xhr.open('POST','/removeuser',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
      alert(xhr.responseText);
    }
    xhr.send(JSON.stringify(newUser));
        console.log("Waiting ")
      $("#userAddressA").val('');
  }
  function checkPRCUser() {
    var userAddress = $("#userAddressA").val();
    var newUser =
    {
        useraddress : userAddress
    }
    xhr.open('POST','/checkuser',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
      alert(xhr.responseText);
    }
    xhr.send(JSON.stringify(newUser));
        console.log("Waiting ")
      $("#userAddressA").val('');
  }
  
  function getProductInfo() {
    $("#productNameB").html('');
    $("#rawMaterialsB").html('');
    $("#memberAddressB").html('');
    $("#registryTimeB").html('');
    $("#productAddressB").html('');
  }
  window.onload = function() {

    getPlantformInfo();
    getAllRegister();
  
    $("#home_tab").click(function(e) {
      e.preventDefault();
      getPlantformInfo();
      getAllRegister();
    })
  
    $("#product_tab").click(function(e) {
      e.preventDefault();
      getProductInfo();
    })
  
    $("#account_tab").click(function(e) {
      e.preventDefault();
      getBatchAddress();
    })
  
    $("#registerProductBtnA").click(function() {
      productRegister();
      getAllRegister();
    });
  
    $("#registerMaterialBtnA").click(function() {

      materialRegister();
      getAllRegister();
    });
  
    $("#addBtnA").click(function() {
      addPRCUser();
    });
  
    $("#removeBtnA").click(function() {
      removePRCUser();
    });
  
    $("#checkBtnA").click(function() {
      checkPRCUser();
    });
  
    $("#okBtnB").click(function() {
      getProductOfCode();
    });
  
    $("#updateBtnB").click(function() {
      addBatch();
    });
  
    $("#addBtnB").click(function() {
      addBACUser();
    });
  
    $("#removeBtnB").click(function() {
      removeBACUser();
    });
  
    $("#checkBtnB").click(function() {
      checkBACUser();
    });
  
    $("#okBtnC").click(function() {
      getTrOfCodeAndBatch();
    });
  
    $("#addBtnC").click(function() {
      addTr();
    });
  
    $("#addUserBtnC").click(function() {
      addTUCUser();
    });
  
    $("#removeBtnC").click(function() {
      removeTUCUser();
    });
  
    $("#checkBtnC").click(function() {
      checkTUCUser();
    });
  
  };

  