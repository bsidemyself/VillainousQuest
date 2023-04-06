
console.log("test1")
const logout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
      // isLoggedIn = false
    } else {
      alert(response.statusText);
    }
  };
  
  // document.querySelector('#logout').addEventListener('click', logout);
