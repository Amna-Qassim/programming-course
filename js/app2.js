// track if inputs are valid or not
let formEntriesValid = {
  fullName: false, 
  email: false 
};

// Add event listeners
$('#regForm').on('submit', handleFormSubmission);
$('#fullName').on('input', validateFullName);
$('#email').on('input', validateEmail);

// Methods
function validateFullName() {

  // Assign the input value to a variable to perform validation
  let fullName = $(this).val(); 
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
    formEntriesValid.fullName = false;
  } 
  else {
    // Hide previous error message
    hide();
    // Set fullName as valid up to this point
    formEntriesValid.fullName = true; 

    // Create regular expression to check against fullName and lastName input
    let testExp = new RegExp(/^[a-zA-Z0-9 ]+$/); 
    // Check if fullName is alphanumeric
    if (!testExp.test(fullName)) {
      // Return custom error message
      msg('Must not have any special characters'); 
      // Set field to invalid
      formEntriesValid.fullName = false;
    } 
    else {
      hide(); 
      formEntriesValid.fullName = true;
      // Check if fullName meets length requirements
      if (fullName.length < 3 || fullName.length > 20) {
        msg('Must be at least 3 characters but no more than 20'); 
        formEntriesValid.fullName = false; 
        formEntriesValid.lastName = false; 
      } 
      else {
        hide(); 
        formEntriesValid.fullName = true;
      }
    }
  }
}

function validateEmail(){
  let email = $(this).val(); 
  
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
    formEntriesValid.email = false; 
  } 
  else {
    hide(); 
    formEntriesValid.email = true;
    // Regular Expression to test against e-mail value
    let testExp = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/); 
    // Check if e-mail value passes regular expression test
    if (!testExp.test(email)) {
      msg('Must be a valid e-mail'); 
      formEntriesValid.email = false; 
    } 
    else {
      hide(); 
      formEntriesValid.email = true;
      // Check if e-mail value meets length requirements
      if (email.length < 3 || email.length > 30) {
        msg('Must be at least 3 characters but no more than 30');
        formEntriesValid.email = false; 
      } 
      else {
        hide();
        formEntriesValid.email = true; 
      }
    }
  }
}

function handleFormSubmission(e) {
  e.preventDefault();
}
