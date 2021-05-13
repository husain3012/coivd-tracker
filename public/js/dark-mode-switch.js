var darkSwitch = document.getElementById("darkSwitch");
var darkSwitchLabel = document.getElementById("darkSwitchLabel");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function () {
      resetTheme();
    });
  }
});

/**
 * Summary: function that adds or removes the attribute 'data-theme' depending if
 * the switch is 'on' or 'off'.
 *
 * Description: initTheme is a function that uses localStorage from JavaScript DOM,
 * to store the value of the HTML switch. If the switch was already switched to
 * 'on' it will set an HTML attribute to the body named: 'data-theme' to a 'dark'
 * value. If it is the first time opening the page, or if the switch was off the
 * 'data-theme' attribute will not be set.
 * @return {void}
 */
function initTheme() {
  var darkThemeSelected = localStorage.getItem("darkSwitch") !== null && localStorage.getItem("darkSwitch") === "dark";
  darkSwitch.checked = darkThemeSelected;
  if(darkThemeSelected){
    document.body.setAttribute("data-theme", "dark");
    darkSwitchLabel.classList.remove("fa-moon");
    darkSwitchLabel.classList.add("fa-sun");
    
  }
  else{
    document.body.removeAttribute("data-theme");
    darkSwitchLabel.classList.remove("fa-sun");
    darkSwitchLabel.classList.add("fa-moon");
  }
  // darkThemeSelected ? document.body.setAttribute("data-theme", "dark") : document.body.removeAttribute("data-theme");
}

/**
 * Summary: resetTheme checks if the switch is 'on' or 'off' and if it is toggled
 * on it will set the HTML attribute 'data-theme' to dark so the dark-theme CSS is
 * applied.
 * @return {void}
 */
function resetTheme() {
  if (darkSwitch.checked) {
    darkSwitchLabel.classList.remove("fa-moon");
    darkSwitchLabel.classList.add("fa-sun");
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  } else {
    darkSwitchLabel.classList.remove("fa-sun");
    darkSwitchLabel.classList.add("fa-moon");
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");
  }
}
