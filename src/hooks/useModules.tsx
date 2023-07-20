import module1 from "../modules/1-phrases.json"
import module2 from "../modules/2-food.json"
import module3 from "../modules/3-drink.json"
import module4 from "../modules/4-phrases.json"
import module5 from "../modules/5-number.json"
import module6 from "../modules/6-weather.json"
import module7 from "../modules/7-phrases.json"
import module8 from "../modules/8-days.json"
import module9 from "../modules/9-colours.json"
import module10 from "../modules/10-environment.json"
import module11 from "../modules/11-endearment.json"
import module12 from "../modules/12-animals.json"
import module13 from "../modules/13-travel.json"
import module14 from "../modules/14-family.json"
import module15 from "../modules/15-relationships.json"
import module16 from "../modules/16-emotions.json"
import module17 from "../modules/17-clothing.json"
import module18 from "../modules/18-transport.json"
import module19 from "../modules/19-geography.json"
import module20 from "../modules/20-education.json"
import module21 from "../modules/21-kitchen.json"
import module22 from "../modules/22-home.json"
import module23 from "../modules/23-taste.json"
import module24 from "../modules/24-pronouns.json"
import module25 from "../modules/25-prepositions.json"

export const useModules = () => {
  const modules = [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8,
    module9,
    module10,
    module11,
    module12,
    module13,
    module14,
    module15,
    module16,
    module17,
    module18,
    module19,
    module20,
    module21,
    module22,
    module23,
    module24,
    module25,
  ]

  return { modules }
}
