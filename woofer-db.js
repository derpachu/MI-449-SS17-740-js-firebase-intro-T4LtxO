var config = {
  apiKey: 'AIzaSyCMcKpsyPT88K7LiBdDX7D4tRm0KKuW2Mo',
  authDomain: 'messaging-thing-cab78.firebaseapp.com',
  databaseURL: 'https://messaging-thing-cab78.firebaseio.com',
  projectId: 'messaging-thing-cab78',
  storageBucket: 'messaging-thing-cab78.appspot.com',
  messagingSenderId: '132173847576'
}
firebase.initializeApp(config)
firebase.auth().signInAnonymously()

function createWoofInDatabase (woof) {
  firebase.database().ref('woofs').push({
    woof
  })
}

// READ from Firebase when woofs are added, changed, or removed
// Write a function for each 'on' method and call addWoofRow,
// updateWoofRow, and deleteWoofRow to update the page. Make
// sure to pass the right parameters (hint: these functions are
// defined in woofer-ui.js).
function readWoofsInDatabase () {
  firebase.database().ref('woofs')
  .on('child_added', function (woofSnapshot) {
    if (woofSnapshot.exists()) {
      var key = woofSnapshot.key
      var text = woofSnapshot.val().woof
      addWoofRow(key, text)
    }
  })

  firebase.database().ref('woofs')
  .on('child_changed', function (woofSnapshot) {
    if (woofSnapshot.exists()) {
      var key = woofSnapshot.key
      var text = woofSnapshot.val().woof
      updateWoofRow(key, text)
    }
  })

  firebase.database().ref('woofs')
  .on('child_removed', function (woofSnapshot) {
    if (woofSnapshot.exists()) {
      var key = woofSnapshot.key
      deleteWoofRow(key)
    }
  })
  // TODO read new, changed, and deleted Firebase records
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs/' + woofKey + '/woof').set({
    created_at: new Date().getTime(),
    text: woofText
  })

  // TODO update the record in Firebase
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs/' + woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
