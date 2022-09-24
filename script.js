/*

Selections: Depression, Sexual Dysfunction, Smoking, ADHD, Obesity, Anxiety, Phobias, Panic Disorder, Low Libido, Insomnia, OCD, Migraines, Chronic Pain (SSRI), 
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

const testUserArray = ['Sexual Dysfunction', 'ADHD', 'OCD'];

//const SSRI= ['Depression', 'OCD', 'Chronic Pain', 'PTSD', 'Anxiety', 'Panic Disorder', 'Phobias'];
//const Bupropion = ['Depression', 'ADHD', 'Sexual Dysfunction', 'Smoking'];

const medArray = [['Depression', 'OCD', 'Chronic Pain', 'PTSD', 'Anxiety', 'Panic Disorder', 'Phobias'], ['Depression', 'ADHD', 'Sexual Dysfunction', 'Smoking']];


const findBestMed = (userArray, medArray) => {
    //let incrementor = 0;
    let symptoms = userArray;
    let medication = medArray;
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
    }
    console.log(scoreArray);
}

findBestMed(testUserArray, medArray);
