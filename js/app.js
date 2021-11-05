//validate form by jquery validation library
$(document).ready(function() {
  $("#regForm").validate({
      rules: {
      fullName : {
          required: true,
          minlength: 3
      },
      email: {
          required: true,
          email: true
      },
      phoneNumber: {
          required: true,
          number: true
      }
      },
      messages : {
      fullName: {
          required: "Please enter your First Name",
          minlength: "Name should be at least 3 characters"
      },
      email: {
          email: "The email should be in the format: abc@domain.tld"
      },
      phoneNumber: {
          required: "please enter your Phone Number",
          number: "Please enter your phone number as a numerical value"
      }
      }
  });
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
