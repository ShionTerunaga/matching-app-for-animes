import { init } from "./init"
import { men, women } from "./people"

export const main = () => {
    let count: number = 0

    init()

    while (true) {
        count++

        let singleNum: number = 0

        console.log(`マッチング${count}回目`)

        //独身がいるかどうか
        men.forEach((item) => {
            if (item.pair === -1) singleNum++
        })

        //終了
        if (singleNum === 0 || count === 50) {
            console.log("終了しました")

            men.forEach((item) => {
                if (item.pair === -1) {
                    console.log(`${item.name}はマッチできませんでした`)
                } else {
                    console.log(
                        `${item.name}は${
                            women[item.pair].name
                        }とくっつきました。`
                    )
                }
            })

            return
        }

        let menRandom = 0
        for (let i = 0; i < 1; i++) {
            menRandom = Math.floor(Math.random() * men.length)

            if (men[menRandom].pair !== -1) i--
        }

        const womenRandom = Math.floor(Math.random() * women.length)

        console.log(
            `${men[menRandom].name}は${women[womenRandom].name}にアタックしました。`
        )

        const attackProbability = Math.random()

        if (
            women[womenRandom].pair === -1 &&
            attackProbability > women[womenRandom].pairProbability[menRandom]
        ) {
            console.log(
                `${women[womenRandom].name}は${men[menRandom].name}を好きになりました。`
            )
            console.log(`よって2人は付き合いました。\n`)

            men[menRandom].pair = womenRandom
            men[menRandom].matchProbability = attackProbability

            women[womenRandom].pair = menRandom
            women[womenRandom].matchProbability = attackProbability

            continue
        } else if (
            women[womenRandom].pair === -1 &&
            attackProbability < women[womenRandom].pairProbability[menRandom]
        ) {
            console.log(
                `${women[womenRandom].name}は${men[menRandom].name}を好きになれませんでした。`
            )
            console.log(`よって2人はお付き合いしませんでした。\n`)

            continue
        }

        if (women[womenRandom].matchProbability > attackProbability) {
            console.log(
                `${women[womenRandom].name}は${men[menRandom].name}のアプローチに負けて付き合うことになりました。`
            )
            console.log(
                `${men[women[womenRandom].pair].name}は${
                    women[womenRandom].name
                }とお別れしました。\n`
            )

            men[menRandom].pair = womenRandom
            men[menRandom].matchProbability = attackProbability

            men[women[womenRandom].pair].pair = -1
            men[women[womenRandom].pair].matchProbability = 0

            women[womenRandom].pair = menRandom
            women[womenRandom].matchProbability = attackProbability
        } else {
            console.log(
                `${women[womenRandom].name}は${
                    men[women[womenRandom].pair].name
                }とラブラブなため断られてしまいました。`
            )
            console.log(
                `${men[menRandom].name}は${women[womenRandom].name}を諦めました`
            )

            console.log(`\n`)
        }
    }
}
