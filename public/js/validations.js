/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validatePwd() {
  let password = document.getElementById('newPassword').value;
  let confirmPassword = document.getElementById('newPasswordConf').value;
  console.log(password, confirmPassword);
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return false;
  }
  return true;
}

function equalPassword() {
  let password = document.getElementById('currentPassword').value;
  let newPassword = document.getElementById('newPassword').value;
  console.log(password, newPassword);
  if (password === newPassword) {
    alert("New password can't be equal to current Password.");

    return false;
  }
  return true;
}

function validateEmail() {
  let mail = document.getElementById('email').value;
  if (
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      mail
    )
  ) {
    return true;
  }
  alert('You have entered an invalid email address!');
  return false;
}

function changePwdValidation() {
  let password = document.getElementById('currentPassword').value;
  let newPassword = document.getElementById('newPassword').value;
  let newPasswordConf = document.getElementById('newPasswordConf').value;

  console.log(` ${password} ${newPassword} ${newPasswordConf}`);
  if (password === '' || newPassword === '' || newPasswordConf === '') {
    alert('All fields must be filled out');
    return false;
  }
  if (password === newPassword) {
    alert("New password can't be equal to current Password.");
    return false;
  }
  if (newPassword !== newPasswordConf) {
    alert('New Password and Confirmation Password do not match.');
    return false;
  }
}
