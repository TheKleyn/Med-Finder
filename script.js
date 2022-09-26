/*

Selections: Depression, Sexual Dysfunction, Smoking, Nerve Pain, ADHD, Obesity, Anxiety, Phobias, Panic Disorder, Low Libido, Insomnia, OCD, Migraines, Chronic Pain (SSRI), 
Fibromyalgia, PTSD (ssri), Bulimia.
Medications: SSRI, General Tricyclics, Anafranil, Nortriptyline, Amitriptyline, SNRI, Mirtazapine, Trazadone

Outline - user responses are pushed into an array,
User array is looped against every med in the array of array.
For every match, a counter is incremented. 
Counter number is pushed into a new array.
Find index of highest number in the new array.
Compare index against index of drug array names, which are in same order as features array.
Either return that answer as innerHTML then, or-
Use index of returned final drug to access array of side effects. 
If there's a match between any side effects the user selceted as dealbreaker
and the side effect array, return unable to help or go to next index number.
Maybe use a scale 1-5 weighted response? This would break ties. Would need to compare user array to drug array, then if
deeply equals, increment by the value of that selector instead of just plus one. Then push incrementor into results array.
*/

//this what will get returned from the user
//symptoms
const userSymptomArray = ['Depression'];
//unwanted side effects
const userUnwantedSideEffects = ['Sexual Dysfunction', 'Insomnia'];

//array of arrays consisting of medication indications, preceded by med name
const medArray = [['SSRIs', 'Depression', 'OCD', 'Chronic Pain', 'PTSD', 'Anxiety', 'Panic Disorder', 'Phobias', /*side effects*/
'Sexual Dysfunction', 'Insomnia', 'Emotional Flattening'], 
['Bupropion', 'Depression', 'ADHD', 'Smoking', /*side effects*/ 'Insomnia', 'Headaches', 'Palpitations', 'Constipation'],
['Nortriptyline', 'Nerve Pain', 'Migraines', 'Pediatric Nocturnal Enuresis', /*side effects*/ 'Constipation', 'Insomnia']];

/*const sideEffects = [['SSRI', 'Sexual Dysfunction', 'Insomnia', 'Emotional Flattening'],
['Bupropion', 'Insomnia', 'Headaches', 'Palpitations', 'Constipation'],
['Nortiptyline', 'Constipation', 'Insomnia']];*/


//this checks the meds array against the unwanted side effects array the user gives, then creates a new array of arrays, 
//free of meds with those side effects, to be used in the matching function
const excludeSideEffects = (userSymptomArray, medArray) => {
    let incrementArray = [];
    let sideEffects = userSymptomArray;
    let medication = medArray;
    
    for (i = 0; i < medication.length; i++) {
            for (x = 0; x < sideEffects.length; x++) {
                if (medication[i].indexOf(sideEffects[x]) <= -1) {
                
                    incrementArray.push(medication[i]);
                    //add med index? or firdt name, now its just checking count total of occurance of symptoms, try switching orfer of what iterates over what
                    console.log(sideEffects[x], medication[i]);
                    
                }
        }

    }
    
    console.log('what follows is the incrementarray');
    console.log(incrementArray);
    console.log('end of the incrementarray');

    return(incrementArray);
}

let noSideEffectsArray = excludeSideEffects(userUnwantedSideEffects, medArray);

//this function compares the user input and then pushes scores for each med into a scoreArray
const findBestMed = (userSymptomArray, noSideEffectsArray) => {
    let symptoms = userSymptomArray;
    let medication = noSideEffectsArray;
    let scoreArray = [];
    for (i = 0; i < medication.length; i++){
        let incrementor = 0;
        for (y = 0; y < medication[i].length; y++){
            for (x = 0; x < symptoms.length; x++) {
                if (symptoms[x] === medication[i][y]) {
                    incrementor += 1;
                    //add med index? or firdt name, now its just checking count total of occurance of symptoms, try switching orfer of what iterates over what
                    console.log(symptoms[x], medication[i][y]);
                    
                }
                
            }
            
        }
        scoreArray.push(incrementor);
        scoreArray.push(medication[i][0]);
    }
    
    return(scoreArray);

}
console.log('this is outside fx');
let scoreArray = findBestMed(userSymptomArray, noSideEffectsArray);
console.log(scoreArray);

//this function iterates through the scoreArray to find the highest number med
//then adds 1 to index to return name of med
const returnMatch = (array) => {
    let highestNumber = 0;
    let indexHigh = 0;
    

    for (i = 0; i < array.length; i++) {
        if (array[i] > highestNumber) {
            highestNumber = array[i];
            indexHigh = i;
        } 
    }
    let finalAnswer = array[indexHigh + 1];

    if (finalAnswer === undefined) {
        return('Sorry, no anti-depressant medications matched your criteria. Try reducing the number of excluded side effects.')
    } else {
        return(`Ask your medical provider about ${finalAnswer}. This medication may be indicated for your symptoms.`);
    }
    //console.log(indexHigh);
    //console.log(finalAnswer);
    
}

let finalMed = returnMatch(scoreArray);
console.log(finalMed);


