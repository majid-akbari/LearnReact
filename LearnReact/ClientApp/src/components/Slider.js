import React from 'react';
import { Glyphicon, Button, Alert } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { labels } from '../constants';

const Slider = props => {

    function save(e) {
        e.preventDefault(); props.onSave(props.lists, props.selectedItems);
    }

    const errorMessage = props.error ?
        <Alert bsStyle="danger" className="pull-left">{props.error}</Alert>
        : null;

    const lastStep = props.step === props.lists.length;

    const prevButton = <Button
        bsStyle="link"
        className="pull-right btn-slide"
        onClick={() => props.onPrev()}>
        <Glyphicon glyph='chevron-right' />
    </Button>;

    const nextButton = <Button
        bsStyle="link"
        className="pull-left btn-slide"
        onClick={() => props.onNext()}>
        <Glyphicon glyph='chevron-left' />
    </Button>;

    const saveButton = <Button
        bsStyle="link"
        className="pull-left myButton"
        onClick={(e) => save(e)}>
        {labels.save}
    </Button>;

    const generateSlide = (list) => {
        return <div className="step">
            <h3>{list.title}</h3>
            <ul>
                {
                    list.items.map(item =>
                        <li
                            className={props.selectedItems[list.title] === item.id ? "selected" : ""}
                            onClick={() => props.onSelectItem(list.title, item.id)}
                            key={item.id}
                            data-id={item.id}>
                            {item.title}
                        </li>)
                }
            </ul>
        </div>;
    };

    return <div className="slider">

        <TransitionGroup className="slider-wrapper">
            {
                props.lists.map((list, index) => (
                    props.step === index + 1 ?
                        <CSSTransition
                            classNames="step"
                            timeout={500}
                            key={index}>
                            {generateSlide(list)}
                        </CSSTransition> : ""
                ))
            }
        </TransitionGroup>

        <div className="clearfix"></div>
        <div className="footer">
            {props.step === 1 ? "" : prevButton}
            {lastStep ? saveButton : nextButton}
            {lastStep ? errorMessage : ""}
            <div className="clearfix"></div>
        </div>
    </div >;
}

export default Slider;