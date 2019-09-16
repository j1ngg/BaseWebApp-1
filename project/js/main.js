$(document).ready(function(){
  getPosts();
})

function handleSignIn(){
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addMessage(postTitle,postBody) {
  var postData = {
    title: postTitle,
    body: postBody
  }

  var database = firebase.database().ref("posts");

  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
      window.location.reload();
    }
  });

}

function handleMessageFormSubmit(){
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle,postBody);
}

function getPosts() {

  return firebase.database().ref("posts").once('value').then(function(snapshot) {
    var posts = snapshot.val(); 
    console.log(posts);
    
    for(var postKey in posts) {
      var post = posts[postKey];
      $("#post-listing").append("<div>"+post.title+" - "+post.body+"</div>");
    }
  });
}

function display_random_image() 
{
     var theImages = [{
        src: "https://www.lifewire.com/thmb/ahPWVMsjWpjIgxMamJ1JCUsfxZU=/1002x668/filters:no_upscale():max_bytes(150000):strip_icc()/top-memes-of-all-time-3485903-A-v1-5b16fd32ff1b780036ad3967.PNG",
        width: "240",
        height: "160"
    }, {
        src: "https://cdn.mamamia.com.au/wp/wp-content/uploads/2018/06/18161757/funniest-memes-20.jpg",
        width: "320",
        height: "195"
    }, {
        src: "https://theviraler.com/wp-content/uploads/2018/02/15-36.jpg",
        width: "500",
        height: "664"
    },  {
          src: "https://theviraler.com/wp-content/uploads/2018/02/35-34.jpg",
          width: "590",
          height: "775"    
    },  {
          src: "https://pics.astrologymemes.com/ust-remember-youire-getting-paid-for-this-hide-the-pain-54055077.png",
          width: "500",
          height: "442"   
    }];
    
    var preBuffer = [];
    for (var i = 0, j = theImages.length; i < j; i++) {
        preBuffer[i] = new Image();
        preBuffer[i].src = theImages[i].src;
        preBuffer[i].width = theImages[i].width;
        preBuffer[i].height = theImages[i].height;
    }
   
// create random image number
  function getRandomInt(min,max) 
    {
      //  return Math.floor(Math.random() * (max - min + 1)) + min;
    
imn = Math.floor(Math.random() * (max - min + 1)) + min;
    return preBuffer[imn];
    }  

// 0 is first image,   preBuffer.length - 1) is  last image
  
var newImage = getRandomInt(0, preBuffer.length - 1);
 
// remove the previous images
var images = document.getElementsByTagName('img');
var l = images.length;
for (var p = 0; p < l; p++) {
    images[0].parentNode.removeChild(images[0]);
}
// display the image  
document.body.appendChild(newImage);
}