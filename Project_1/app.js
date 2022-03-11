/**
 * Project Requirement
 * -Change the Background Color by Generating random Hax color by clicking a Button
 * -- Also display hax code to a input field
 * -- Add a button to copy the color code
 * -- Add a toast message when code copied
 * -- User can type their hax code too
 */



// change Background color by Clicking RGBChangeBTN Button
// gloval variable for toest messgae
let div = null;
// Selection the element
const RGBChangeBTN = document.getElementById('RGBChangeBTN');
const RootBG = document.getElementById('root')
const output = document.getElementById('output');
const copyColorBtn = document.getElementById('copyColorBtn')

// rgb color ganerator function
const RGBGenerator = () => {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    // Genarate RBG Color
    // RGBColor = `rgb(${red},${green},${blue})`

    RGBColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
    return RGBColor;
}

// Change RGB BG color function
RGBChangeBTN.addEventListener('click', function () {
    const BGColor = RGBGenerator()
    RootBG.style.backgroundColor = BGColor
    output.value = BGColor;
    div.remove();
    div = null;


})

//copy to clipboard 
copyColorBtn.addEventListener('click', function () {
    const outputValue = output.value
    navigator.clipboard.writeText(outputValue)
    if (div !== null) {
        div.remove();
        div = null;
    }
    if (isColorValid(outputValue)) {
        const msg = `${outputValue} ___copied Successfully`
        const addClass = 'success-toast-msg'
        generateToast(msg, addClass)

    } else {
        const msg = 'You Enter valid color code'
        const addClass = 'error-toast-msg'
        generateToast(msg, addClass)

    }
})
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
    if (colorCode < 7) return false;
    if (colorCode[0] != '#') return false;
    colorCode = colorCode.substring(1)
    return /^[0-9A-Fa-f]{3}$/i.test(colorCode) || /^[0-9A-Fa-f]{6}$/i.test(colorCode)
}

// input color function 
output.addEventListener('keyup', function (e) {
    const color = e.target.value;
    if (color && isColorValid(color)) {
        RootBG.style.backgroundColor = color
    }

})