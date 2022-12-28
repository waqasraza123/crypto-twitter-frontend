
// function StringChallenge(str) {
//     let inputString = str.trim()
//     let output = ""
//
//     //convert characters to ascii/decimal
//     for(let i=0; i<inputString.length; i++){
//
//         output += inputString.charCodeAt(i) === 32 ? " " : inputString.charCodeAt(i)
//
//     }
//
//     return output;
//
// }
//
// // keep this function call here
// console.log(StringChallenge(readline()));
//
//
// /////
//
//
// function SearchingChallenge(str) {
//
//     let smallBracketsCount = 0
//     let mediumBracketsCount = 0
//     let squareBracketsCount = 0
//
//
//     for(let i=0; i<str.length; i++){
//         //increate count on opening
//         switch(str[i]){
//             case "(":
//                 smallBracketsCount++;
//                 break
//             case ")":
//                 smallBracketsCount--;
//                 break
//             case "{":
//                 mediumBracketsCount++;
//                 break
//             case "}":
//                 mediumBracketsCount--;
//                 break
//             case "[":
//                 squareBracketsCount++;
//                 break
//             case "]":
//                 squareBracketsCount--;
//                 break
//         }
//     }
//
//     if(smallBracketsCount == 0 && mediumBracketsCount == 0 && squareBracketsCount == 0){
//         //all brackets match
//         return 1
//     }else{
//         return 0
//     }
//
//
//     //return str;
//
// }
//
// // keep this function call here
// console.log(SearchingChallenge(readline()));
//
//
// /////
//
//
//
