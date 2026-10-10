const form=document.getElementById('authForm');
const modeButtons=[...document.querySelectorAll('[data-mode]')];
const nameField=document.getElementById('nameField');
const confirmField=document.getElementById('confirmField');
const loginOptions=document.getElementById('loginOptions');
const forgotButton=document.getElementById('forgotButton');
const password=document.getElementById('password');
const notice=document.getElementById('notice');
let mode='login';
let demoAccounts=[];

function setNotice(message,type='success'){notice.textContent=message;notice.classList.toggle('error',type==='error');notice.hidden=false}
function clearNotice(){notice.hidden=true;notice.textContent='';notice.classList.remove('error')}
function clearErrors(){document.querySelectorAll('.field-error').forEach(el=>el.textContent='');document.querySelectorAll('.field input').forEach(el=>el.classList.remove('invalid'))}
function setError(inputId,errorId,message){document.getElementById(errorId).textContent=message;document.getElementById(inputId).classList.add('invalid')}
function setMode(nextMode){mode=nextMode;clearErrors();clearNotice();const register=mode==='register';nameField.hidden=!register;confirmField.hidden=!register;loginOptions.hidden=register;forgotButton.hidden=register;document.getElementById('formEyebrow').textContent=register?'A FRESH START':'WELCOME BACK';document.getElementById('formTitle').textContent=register?'Create your account.':'Sign in to your space.';document.getElementById('formSubtitle').textContent=register?'A few details and you are ready to go.':'Pick up right where you left off.';document.getElementById('submitLabel').textContent=register?'Create account':'Sign in';document.getElementById('passwordHint').textContent=register?'Use at least 8 characters.':'Use at least 8 characters.';password.autocomplete=register?'new-password':'current-password';document.getElementById('confirmPassword').required=register;document.getElementById('fullName').required=register;modeButtons.forEach(button=>{const active=button.dataset.mode===mode;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active))});document.getElementById('switchCopy').innerHTML=register?'Already have an account? <button type="button" data-switch="login">Sign in</button>':'New to Northstar? <button type="button" data-switch="register">Create an account</button>'}
modeButtons.forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
document.getElementById('switchCopy').addEventListener('click',event=>{const button=event.target.closest('[data-switch]');if(button)setMode(button.dataset.switch)});
document.getElementById('togglePassword').addEventListener('click',()=>{const show=password.type==='password';password.type=show?'text':'password';document.getElementById('togglePassword').textContent=show?'Hide':'Show';document.getElementById('togglePassword').setAttribute('aria-label',show?'Hide password':'Show password')});
forgotButton.addEventListener('click',()=>{clearErrors();clearNotice();const email=document.getElementById('email').value.trim();if(!email){setError('email','emailError','Enter your email address first.');document.getElementById('email').focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError('email','emailError','Enter a valid email address.');return}setNotice('Password reset is a demo only. No email was sent.')});
form.addEventListener('submit',event=>{event.preventDefault();clearErrors();clearNotice();const fullName=document.getElementById('fullName').value.trim();const email=document.getElementById('email').value.trim().toLowerCase();const pass=password.value;const confirm=document.getElementById('confirmPassword').value;let valid=true;
if(mode==='register'&&fullName.length<2){setError('fullName','nameError','Enter your name (at least 2 characters).');valid=false}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError('email','emailError','Enter a valid email address.');valid=false}
if(pass.length<8){setError('password','passwordError','Password must be at least 8 characters.');valid=false}
if(mode==='register'&&pass!==confirm){setError('confirmPassword','confirmError','Passwords do not match.');valid=false}
if(!valid)return;
if(mode==='register'){if(demoAccounts.some(account=>account.email===email)){setError('email','emailError','An account with this email exists in this demo.');return}demoAccounts.push({name:fullName,email,password:pass});form.reset();setMode('login');document.getElementById('email').value=email;setNotice('Demo account created in memory. You can now sign in until this page is refreshed.');return}
const account=demoAccounts.find(item=>item.email===email&&item.password===pass);
if(!account){setNotice('No matching demo account. Create an account first, or use the same details you registered in this session.','error');return}
setNotice(`Welcome back, ${account.name}! You have signed in to this demo.`);form.reset();document.getElementById('email').value=email;
});
