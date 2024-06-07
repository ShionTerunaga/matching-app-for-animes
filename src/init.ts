import { women } from "./people"

//初期化処理
export const init = () => {
    for (let i = 0; i < women.length; i++) {
        for (let j = 0; j < women[i].pairProbability.length; j++) {
            const randomNum = Math.random()
            women[i].pairProbability[j] = randomNum
        }
    }
}
