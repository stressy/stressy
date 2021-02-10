
import { initialState } from '../../arrays/cards';

export default function deckReducer(state = initialState, action) {
    switch (action.type) {
        case 'deck/shuffle':
            return action.payload
        case 'deck/putMyCard':
            return {
                ...state,
                sloppy: [...state.sloppy, state.cards[action.target]],
                cards: state.cards.map((item, x) => {
                    if (x === action.lifted) {
                        return state.myDeck[0];
                    } else if (x === action.target) {
                        return state.cards[action.lifted];
                    } else {
                        return item;
                    }
                }),
                myDeck: state.myDeck.slice(1)
            }
        case 'deck/putYourCard':
            return {
                ...state,
                sloppy: [...state.sloppy, state.cards[action.target]],
                cards: state.cards.map((item, x) => {
                    if (x === action.lifted) {
                        return state.yourDeck[0];
                    } else if (x === action.target) {
                        return state.cards[action.lifted];
                    } else {
                        return item;
                    }
                }),
                yourDeck: state.yourDeck.slice(1)
            }
        case 'deck/newDeal':
            return {
                sloppy: state.cards[3] && state.cards[4] ? [...state.sloppy, state.cards[3], state.cards[4]] : [...state.sloppy],
                cards: state.cards.map((item, x) => {
                    if (x === 3) {
                      return state.yourDeck[0];
                    } if (x === 4) {
                        return state.myDeck[0];
                    } else {
                      return item;
                    }
                }),
                myDeck: state.myDeck.slice(1),
                yourDeck: state.yourDeck.slice(1),
                score: state.score
            }
        case 'deck/myStress':
            return {
                ...state,
                yourDeck: [...state.yourDeck, ...state.sloppy],
                sloppy: [],
            }
        case 'deck/yourStress':
            return {
                ...state,
                myDeck: [...state.myDeck, ...state.sloppy],
                sloppy: [],
            }
        case 'deck/setScore':
            return {
                ...state,
                score: {
                    myScore: state.score.myScore += action.myScore,
                    yourScore: state.score.yourScore += action.yourScore,
                }
            }
        default:
            return state
    }
}