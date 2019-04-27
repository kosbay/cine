import React from 'react'

const Steps = props =>

  <div className="steps">
    <div>
      <div className="u-c-text margin-b10">Заполнение анкеты</div>
      <div className="h-text-b">Файлы должны быть отсканированы и отправлены в JPEG.</div>
    </div>
    <ul className="steps-p">
      <li><div className="punkt">{props.name === '' || props.addreviation === '' || props.category === '' || props.code === '' || props.type === '' || props.license === '' ? 1 : <img src="/images/check.svg" />}</div><div className="stp-p-t">Информация о ВУЗе</div></li>
      <li><div className="punkt">{(props.file1A && props.file1A.length === 0) && (props.file2A && props.file2A.length === 0) ? 2 : <img src="/images/check.svg" />}</div><div className="stp-p-t">Загрузить фотографию ВУЗа</div></li>
      <li><div className="punkt">{props.country === '' || props.city === '' || props.address === '' || props.phone === '' || props.o_email === '' ? 3 : <img src="/images/check.svg" />}</div><div className="stp-p-t">Контактная информация</div></li>
      </ul>
  </div>

export default Steps
