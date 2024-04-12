// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
}
  
const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum,
        dna,
        mutate() {
            const randIndex = Math.floor(Math.random() * this.dna.length);
            let newBase = returnRandBase();
            while (this.dna[randIndex] === newBase) {
              newBase = returnRandBase();
            }
            this.dna[randIndex] = newBase;
            return this.dna;
        },
        compareDNA(pAequorObj) {
            const similarities = this.dna.reduce((acc, curr, idx, arr) => {
                if (arr[idx] === pAequorObj.dna[idx]) {
                  return acc + 1;
                } else {
                  return acc;
                }
            }, 0);
            let percentage = ((similarities / this.dna.length) * 100).toFixed(2);
            console.log(`specimen #${this.specimenNum} and specimen #${pAequorObj.specimenNum} have ${percentage}% DNA in common.`)
        },
        willLikelySurvive() {
            const cOrG = this.dna.filter(base => base === 'C' || base === 'G');
            return cOrG.length / this.dna.length >= 0.6; 
        },
        complementStrand() {
            let compStrand = [];
            for (let i = 0; i < this.dna.length; i++ ) {
                if (this.dna[i] === 'A') {
                    compStrand.push('T');
                } else if (this.dna[i] === 'T') {
                    compStrand.push('A');
                } else if (this.dna[i] === 'C') {
                    compStrand.push('G');
                } else if (this.dna[i] === 'G') {
                    compStrand.push('C');
                }
            }
            return compStrand;
        }
    }
}

let survivingSpecimen = [];
let idCounter = 1;
while (survivingSpecimen.length < 30) {
    let newOrg = pAequorFactory(idCounter, mockUpStrand());
    if (newOrg.willLikelySurvive()) {
        survivingSpecimen.push(newOrg);
    }
    idCounter++
}

console.log(survivingSpecimen);

// TESTING

// Test mutate method
let org1 = pAequorFactory(1, ['A', 'C', 'T', 'G', 'T', 'T', 'G', 'T', 'A', 'T', 'C', 'G', 'C', 'T', 'A']);
console.log(org1.mutate());

// Test compareDNA method
let org2 = pAequorFactory(2, ['T', 'A', 'A', 'A', 'C', 'C', 'G', 'A', 'G', 'G', 'G', 'C', 'A', 'G', 'C']);
org1.compareDNA(org2);

// Test willLikelySurvive method 
console.log(org1.willLikelySurvive()); // should return false
console.log(org2.willLikelySurvive()); // should return true

// Test complementStrand method
console.log(org2.complementStrand());
