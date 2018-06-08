import React, {Component} from 'react';
import './App.css';
import Utilities from './Utilities';
import {Container, Row, Col, Card, CardImg} from 'reactstrap';

class App extends Component {
  cpt = 0;

  constructor(props) {
    super(props);

    //lots de cartes
    let cards = [
      {
        id: 1,
        name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCrtCwdxaBO424_Wz_QUX-_Ip6dhWJHpk2AVvnQwvDrk1ZcqEp",
        visible: false,
        matched: false
      },
      {
        id: 2,
        name: "http://jardinsduciel.j.a.pic.centerblog.net/63f10194.jpg",
        visible: false,
        matched: false},
      {
        id: 3,
        name: "https://c1.staticflickr.com/8/7271/7688812482_1f9aa2b6f2_b.jpg",
        visible: false,
        matched: false},
    ];

    //duplication des cartes
    let pairCards = cards.concat(
      cards.map(card => (
        Object.assign({}, card)
      ))
    );

    pairCards = Utilities.shuffle(pairCards);

    this.state = {
      cards: pairCards
    }
  }

  /**
   * Retourne une carte suivant les règles suivante :
   *  - une carte est gagné si elle correspond à une autre carte déjà retournée
   *  - si deux cartes sont visible mais qu'elle ne corresponde pas, elles deviennent caché.
   *
   * @param currentIndexCard index du tableau de carte sélctionné
   */
  returnCard = (currentIndexCard) => {
    //récupère les states des cartes
    let cards = this.state.cards;

    //Vérifie que la selection est permisent => 2 cartes visible et non matched uniquement
    if (this.cpt >= 2) {
      return
    }

    //si la carte est déjà retourné on ne fait rien
    if (cards[currentIndexCard].visible) {
      return
    }
    //retourne une carte face visible
    cards[currentIndexCard].visible = true;
    this.cpt++;

    //vérifie si la carte correspond à une autre carte déjà visible
    cards.forEach((card, indexCard) => {
      //si la carte correpond à une autre carte déjà visible alors elle change d'état
      if (currentIndexCard !== indexCard && cards[currentIndexCard].id === card.id && card.visible) {
        cards[currentIndexCard].matched = card.matched = true
        //et on mets le compteur à 0
        this.cpt = 0;
      }
      //si deux carte sont visible mais ne corresponde pas, on les cache.
      if (currentIndexCard !== indexCard && card.visible && !card.matched) {
        setTimeout(() => {
          cards[currentIndexCard].visible = card.visible = false;
          //et on mets le compteur à 0
          this.cpt = 0;
          //modifie le states des cartes
          this.setState({cards: cards});
        }, 2000)
      }
    });


    //modifie le states des cartes
    this.setState({cards: cards});
  };

  render() {
    return (
      <Container id="memory">
        <h1>Memory</h1>
        <div className="container-game">
          <Row>
            {
              this.state.cards.map((card, index) => (
                <Col className="mb-4" xs="4" key={index}>
                  <Card className="card" onClick={this.returnCard.bind(this, index)}>
                    <CardImg className="card-img" top
                             src={(card.visible || card.matched) ? card.name : 'http://www.tissuspapi.com/2789-8140-large/tissu-de-coton-motif-japonais-origami-jaune-blanc.jpg'}
                             alt="Card image"/>
                  </Card>

                </Col>
              ))
            }
          </Row>
        </div>
      </Container>
    );
  }
}

export default App;
