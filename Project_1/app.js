/**
 * Project Requirement
 * -Change the Background Color by Generating random Hax color by clicking a Button
 * -- Also display hax code to a input field
 * -- Add a button to copy the color code
 * -- Add a toast message when code copied
 * -- User can type their hax code too
 * -- Show the RGB color too, But do not to edit it
 * -- user can also copy the RGB color code 
 */



// change Background color by Clicking RGBChangeBTN Button
// gloval variable for toest messgae
let div = null;
// Selection the element
const changeColorbtn = document.getElementById('RGBChangeBTN');
const RootBG = document.getElementById('root')
const output = document.getElementById('output');
const output2 = document.getElementById('output2');
const copyColorBtn = document.getElementById('copyColorBtn')
const copyColorBtn2 = document.getElementById('copyColorBtn2')


// generate color code decimal
function generateDecimal() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return {
        red,
        green,
        blue
    }
}


// generate haxColor
function haxGenerator({ red, green, blue }) {
    const getTwoCode = (value) => {
        const hax = value.toString(16)
        return hax.length === 1 ? `0${hax}` : hax
    }
    RGBColor = `#${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(blue)}`
    return RGBColor;
}


// rgb color ganerator function
const RGBGenerator = ({ red, green, blue }) => {
    RGBColor = `rbg(${red},${green},${blue})`
    return RGBColor;
}

// Change RGB BG color function
changeColorbtn.addEventListener('click', function () {
    const colorDecimal = generateDecimal()
    const haxColor = haxGenerator(colorDecimal).substring(1)
    const rgbColor = RGBGenerator(colorDecimal)
    RootBG.style.backgroundColor = `#${haxColor}`
    output.value = haxColor;
    output2.value = rgbColor;

    div.remove();
    div = null;


})

//copy to clipboard 
function copyClipboard(btn, output) {
    btn.addEventListener('click', function () {
        const outputValue = output.value
        navigator.clipboard.writeText(`#${output.value}`)
        if (div !== null) {
            div.remove();
            div = null;
        }
        if (isColorValid(outputValue)) {
            const msg = `#${outputValue} ___copied Successfully`
            const addClass = 'success-toast-msg'
            generateToast(msg, addClass)

        } else {
            const msg = 'You Enter valid color code'
            const addClass = 'error-toast-msg'
            generateToast(msg, addClass)

        }
    })
}
// calling copy btn
copyClipboard(copyColorBtn, output)
copyClipboard(copyColorBtn2, output2)

//Generate toast msg
function generateToast(text, addClass) {
    div = document.createElement('div')
    div.innerText = text
    div.className = `toset-msg ${addClass} toast-message-slide-in`;
    div.classList.add = 'toast-message-slide-out';
    document.body.appendChild(div)
    //close btn 
    const closeBtn = document.createElement('div')
    closeBtn.className = 'closeBtn'
    div.appendChild(closeBtn)
    closeBtn.addEventListener('click', function () {
        div.classList.remove('toast-message-slide-out')
        div.remove()
        div = null;
    })
}

/**
 * for string shortcode
 * @param {string} colorCode 
 * @returns 
 */

//check color code 
function isColorValid(colorCode) {
    return /^[0-9A-Fa-f]{6}$/i.test(colorCode) || /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/
}

// input color function 
output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    console.log(color);
    if (color && isColorValid(color)) {
        console.log(true);
        RootBG.style.backgroundColor = `#${color}`
    }

})