///array of arrays consisting of medication indications, preceded by med name
//const oldmedArray = [['SSRIs', 'Depression', 'OCD', 'Chronic Pain', 'PTSD', 'Anxiety', 'Panic Disorder', 'Phobias', /*side effects*/
//'Sexual Dysfunction', 'Insomnia', 'Emotional Flattening'], 
//['Bupropion', 'Depression', 'ADHD', 'Smoking', /*side effects*/ 'Insomnia', 'Headaches', 'Palpitations', 'Constipation'],
//['Nortriptyline', 'Nerve Pain', 'Migraines', 'Pediatric Nocturnal Enuresis', /*side effects*/ 'Constipation', 'Insomnia']];


//this what will get returned from the user
//symptoms
const userSymptomArray = ['Depression'];
//unwanted side effects
const userUnwantedSideEffects = ['Sexual Dysfunction', 'Emotional Flattening', 'Insomnia'];

const medArray = [
    {
        name: 'SSRIs',
        indications: ['Depression', 'OCD', 'Chronic Pain', 'PTSD', 'Anxiety', 'Panic Disorder', 'Phobias'],
        sideEffects: ['Sexual Dysfunction', 'Insomnia', 'Emotional Flattening'],
        description: 'Selective serotonin reuptake inhibitors (SSRIs) are a class of drugs that are typically used as antidepressants in the treatment of major depressive disorder, anxiety disorders, and other psychological conditions.'
    },
    {
        name: 'Bupropion',
        indications: ['Depression', 'ADHD', 'Smoking'],
        sideEffects: ['Insomnia', 'Headaches', 'Palpitations', 'Constipation'],
        description: 'Bupropion, sold under the brand names Wellbutrin and Zyban among others, is an atypical antidepressant primarily used to treat major depressive disorder and to support smoking cessation. It is also popular as an add-on medication in the cases of "incomplete response" to the first-line selective serotonin reuptake inhibitor (SSRI) antidepressant. Bupropion has several features that distinguish it from other antidepressants: it does not usually cause sexual dysfunction; it is not associated with weight gain and sleepiness, and it is more effective than SSRIs at improving symptoms of hypersomnia and fatigue. Bupropion does, however, carry a much higher risk of seizure than many other antidepressants and extreme caution must be taken in patients with a history of seizure disorder.'
    },
    {
        name: 'Nortiptyline',
        indications: ['Nerve Pain', 'Migraines', 'Pediatric Nocturnal Enuresis'],
        sideEffects: ['Constipation', 'Insomnia'],
        description: 'Nortriptyline, sold under the brand name Pamelor, among others, is a medication used to treat depression. This medicine is used for: neuropathic pain, attention deficit hyperactivity disorder (ADHD), smoking cessation and anxiety. As with many antidepressants, its use for young people with depression and other psychiatric disorders may be limited due to increased suicidality in the 18-24 population initiating treatment. Nortriptyline is a less preferred treatment for ADHD and stopping smoking.[4] It is taken by mouth.'
    }
];
//const result = words.filter(word => word.length > 6);

//const filteredArray = array1.filter(value => array2.includes(value));

/*const newFilter = (userInput, medArray) => {
    arrayOfMeds = medArray;
    userEffects = userInput;
    let filteredArray = [];
    for (x =0; x < medArray.length; x++) {
        if (arrayOfMeds[x].sideEffects.filter(value => userEffects.includes(value)) !== true) {
            filteredArray.push(arrayOfMeds[x]);
        };
    }
    return arrayOfMeds;
}
const testArray = newFilter(userUnwantedSideEffects, medArray);
console.log(testArray);
console.log('the above is the test array');

const excludeItems = (arrayOfSearchItems, arrayOfObjects) => {
    return arrayOfObjects.filter(obj => {
        return obj.storage.every(storageItem => {
            return arrayOfSearchItems.includes(storageItem) === false;
        });
    });
}; */



//const filteredArray = medArray[0].sideEffects.filter(value => userUnwantedSideEffects.includes(value));
//console.log(filteredArray);


//this checks the meds array against the unwanted side effects array the user gives, then creates a new array of arrays, 
//free of meds with those side effects, to be used in the matching function
/*const excludeSideEffects = (userSymptomArray, medArray) => {
    let incrementArray = [];
    let userEffects = userSymptomArray;
    let medication = medArray;
    
    for (i = 0; i < userEffects.length; i++) {
            for (x = 0; x < medication.length; x++) {
                if (medication[x].sideEffects.indexOf(userEffects) <= -1) {
                
                    incrementArray.push(medication[x]); 
                    //add med index? or firdt name, now its just checking count total of occurance of symptoms, try switching orfer of what iterates over what
                    console.log(userEffects[i], medication[x]);
                    
                
                }
        }

    }
    
    console.log('what follows is the incrementarray');
    console.log(incrementArray);
    console.log('end of the incrementarray');

    return(incrementArray);
} */

const excludeSideEffects = (userUnwantedSideEffects, medArray) => {
    return medArray.filter(obj => {
        return obj.sideEffects.every(effects => {
            return userUnwantedSideEffects.includes(effects) === false;
        })
    })
};

let noSideEffectsArray = excludeSideEffects(userUnwantedSideEffects, medArray);
console.log(noSideEffectsArray); 

//this function compares the user indication input and then creates scores for each med that passed the side effects test, 
//creates an updated array called scoreArray
const findBestMed = (userSymptomArray, noSideEffectsArray) => {
    let symptoms = userSymptomArray;
    let medication = noSideEffectsArray;
    let scoreArray = [];
    for (i = 0; i < medication.length; i++){
        let incrementor = 0;
        for (y = 0; y < medication[i].indications.length; y++){
            for (x = 0; x < symptoms.length; x++) {
                if (symptoms[x] === medication[i].indications[y]) {
                    incrementor += 1;
                    //add med index? or firdt name, now its just checking count total of occurance of symptoms, try switching orfer of what iterates over what
                    //console.log(symptoms[x], medication[i][y]);
                    
                }
                
            }
            
        }
        medication[i].score = incrementor;
        scoreArray = medication;
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
        if (array[i].score > highestNumber) {
            highestNumber = array[i].score;
            indexHigh = i;
        } 
    }
    let finalAnswer = array[indexHigh];

    if (finalAnswer === undefined) {
        return('Sorry, no anti-depressant medications matched your criteria. Try reducing the number of excluded side effects.')
    } else {
        return(finalAnswer);
    }
    //console.log(indexHigh);
    //console.log(finalAnswer);
    
}

let finalMed = returnMatch(scoreArray);
console.log('what follows is the final med selection');
console.log(finalMed);

