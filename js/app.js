//use pure jquery to make validation for the form

'use strict';

// Perform functions when form is submitted
$('#regForm').on('submit', function(e) {
  e.preventDefault(); // Prevent form from being submitted again
});

// Custom object to track if inputs are valid or not
var formValid = {
  fullName: false, 
  email: false 
};

// Validation for fullName & lastName input field
$('#fullName').on('input', function() {

  // Assign the input value to a variable to perform validation
  var fullName = $(this).val(); 
  // Function to set a custom message
  function msg(body) {
    
    // Set message inside paragraph element and show it in DOM
    $('#fullName-error').text(body).show(); 
  };

  // Function to hide paragraph tag
  function hide() {
    // Hide fullName validation messages
    $('#fullName-error').hide(); 
  };

  // Check if fullName has at least one charactar
  if (fullName.length < 1) {
    msg('This field is required.'); // Assign an error message
    // Set valid status to false
    formValid.fullName = false;
  } 
  else {
    // Hide previous error message
    hide();
    // Set fullName as valid up to this point
    formValid.fullName = true; 

    // Create regular expression to check against fullName and lastName input
    var testExp = new RegExp(/^[a-zA-Z0-9 ]+$/); 
    // Check if fullName is alphanumeric
    if (!testExp.test(fullName)) {
      // Return custom error message
      msg('Must not have any special characters'); 
      // Set field to invalid
      formValid.fullName = false;
    } 
    else {
      hide(); 
      formValid.fullName = true;
      // Check if fullName meets length requirements
      if (fullName.length < 3 || fullName.length > 20) {
        msg('Must be at least 3 characters but no more than 20'); 
        formValid.fullName = false; 
        formValid.lastName = false; 
      } 
      else {
        hide(); 
        formValid.fullName = true;
      }
    }
  }
});

// Validation for E-mail Input
$('#email').on('input', function() {
  var email = $(this).val(); 

  // Function to assign message to paragraph tag
  function msg(body) {
    $('#email-error').text(body).show(); // Show any error messages
  };

  // Function to hide error message
  function hide() {
    $('#email-error').hide(); // Hide any error message
  };

  // Check if e-mail value is at least 1 character
  if (email.length < 1) {
    msg('This field is required.'); 
    formValid.email = false; 
  } 
  else {
    hide(); 
    formValid.email = true;
    // Regular Expression to test against e-mail value
    var testExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/); 
    // Check if e-mail value passes regular expression test
    if (!testExp.test(email)) {
      msg('Must be a valid e-mail'); 
      formValid.email = false; 
    } 
    else {
      hide(); 
      formValid.email = true;
      // Check if e-mail value meets length requirements
      if (email.length < 3 || email.length > 30) {
        msg('Must be at least 3 characters but no more than 30');
        formValid.email = false; 
      } 
      else {
        hide();
        formValid.email = true; 
      }
    }
  }
});


//store data locally

//Listen for form submit
document.getElementById('regForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var fullName = getInputVal('fullName');
  var email = getInputVal('email');
  var phoneNumber = getInputVal('phoneNumber');

  // Save message
  saveMessage(fullName, email, phoneNumber)

}

//Function to grt form values
function getInputVal(id) {
  var str,
  input = document.getElementById(id);
  var inputVal = "";
  if (input) {
    inputVal = input.value;
  }
  return inputVal;
}


async function saveMessage(fullName, email, phoneNumber){
  
  // wait for localforage to be ready
  await localforage.ready().catch(function(err){
    console.error('Failed to load localforage drivers');
    console.error(err);
  });

  // create storage instance
  let store = localforage.createInstance({
    name: 'forms'
  });

  // check if we already have an array called registrations in storage
  if (await store.getItem('registrations') === null){

    // no array called registrations found. so we create one
    await store.setItem('registrations', []);
  }

  // get a colleciton of all registrations in storage
  let collection = await store.getItem('registrations');

  // add data to the collection
  collection.push({
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
  });

  // save the collection to registrations in storage.
  await store.setItem('registrations', collection);
}
