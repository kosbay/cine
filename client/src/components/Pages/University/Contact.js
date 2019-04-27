import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoogleMap from './GoogleMap';
import { fileserver } from '../../../constants';

class Contact extends Component {

    render() {
        return(
            <div ref="scroll" className="u-contact">
                <div className="u-contact-h">
                    {
                        /*this.props.bottom ?
                            null :
                            <img src={`http://${fileserver}:9999/${this.props.univer.univer.logo}`} />*/
                    }
                    <img src={`http://${fileserver}:9999/${this.props.univer.univer.logo}`} />
                    <p className="u-c-text">
                        {this.props.univer.univer.univer_name}
                    </p>
                </div>
                <div className="u-c-about">
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Аббревиатура</div>
                        <div className="i-c-t-w">{this.props.univer.univer.addreviation}</div>
                    </div>
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Категория</div>
                        <div className="i-c-t-w">{this.props.univer.univer.category}</div>
                    </div>
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Тип ВУЗа</div>
                        <div className="i-c-t-w">{this.props.univer.univer.type}</div>
                    </div>
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Код ВУЗа</div>
                        <div className="i-c-t-w">{this.props.univer.univer.code}</div>
                    </div>
                    <div className="u-c-p">
                        <div className="i-c-t-b">Номер лицензии</div>
                        <div className="i-c-t-w">{this.props.univer.univer.license}</div>
                    </div>
                </div>
                <GoogleMap
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfPvKrVvV2HltGpO_tkVP1JbyIi_gdSZU&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
                    containerElement={<div style={{ height: `100px`, width: `100%` }} />}
                    mapElement={<div style={{ height: `100%`, width: `100%`, marginTop: `20px` }} />}
                    onMap={this.props.onMap}
                    {...this.props.univer.univer.location}
                />
                <div className="u-c-address">
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Адрес</div>
                        <div className="i-c-t-w">{this.props.univer.univer.location.address}</div>
                    </div>
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Телефон</div>
                        <div className="i-c-t-w">{this.props.univer.univer.phone}</div>
                    </div>
                    <div className="u-c-p margin10">
                        <div className="i-c-t-b">Электронная почта</div>
                        <div className="i-c-t-w">{this.props.univer.univer.o_email}</div>
                    </div>
                    {
                        this.props.univer.univer.website ?
                            <div className="u-c-p margin10">
                                <div className="i-c-t-b">Сайт</div>
                                <div className="i-c-t-w"><a href={this.props.univer.univer.website} target="__blank">{this.props.univer.univer.website}</a></div>
                            </div> :
                            null
                    }
                    {/*<div className="u-c-p">
        <div className="i-c-t-b">Соц. сети</div>
        <div className="i-c-t-w"></div>
      </div>*/}
                </div>
                <div className="btn-wrap">
                    <Link to={`/student/apply/${this.props.univer.univer.univer_name}/${this.props.univer.univer._id}/Выберите факультет/0/Выберите специальность/0`}>
                        <button className="btn-app-l">Подать заявку</button>
                    </Link>
                    <Link to={`/student/apply/${this.props.univer.univer.univer_name}/${this.props.univer.univer._id}`}>
                        <button className="btn-info-l">Добавить в избранное</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Contact
