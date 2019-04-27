import React from 'react'

const Steps = props =>

  <div className="steps">
    <div>
      <div className="u-c-text margin-b10">Необходимые документы</div>
      <div className="h-text-b">Файлы должны быть отсканированы и отправлены в JPEG.</div>
    </div>
    <ul className="steps-p">
      <li>
        <div className="punkt">
          {
            props.univer_id === "0" ||
            (props.facultet_id === "0" && props.facultet_id) ||
            (props.special_id === "0" && props.special_id) ?
            1 : <img src="/images/check.svg" />
          }
        </div>
        <div className="stp-p-t">ВУЗ, Факультет, Специальность</div>
      </li>
      <li><div className="punkt">{ props.file1a.length === 0 ? 2 : <img src="/images/check.svg" /> }</div><div className="stp-p-t">Удостоверение личности</div></li>
      <li><div className="punkt">{ props.file2a.length === 0 ? 3 : <img src="/images/check.svg" /> }</div><div className="stp-p-t">Фото 3x4</div></li>
      <li><div className="punkt">{ props.file3a.length === 0 ? 4 : <img src="/images/check.svg" /> }</div><div className="stp-p-t">Мед. справка 086-У</div></li>
      <li><div className="punkt">{ props.file4a.length === 0 ? 5 : <img src="/images/check.svg" /> }</div><div className="stp-p-t">Приписное свидетельство (военкомат)</div></li>
      <li><div className="punkt">{ props.file5a.length === 0 ? 6 : <img src="/images/check.svg" /> }</div><div className="stp-p-t">Аттестат и Сертификат о ЕНТ</div></li>
      <li><div className="punkt">{ props.school_name === '' || props.number_of_school === '' ? 7 : <img src="/images/check.svg" /> }</div><div className="stp-p-t">Информация о себе</div></li>
      <li><div className="punkt">{ (props.address !== '' && props.city !== '') && (props.region !== '' && props.index !== '') ? <img src="/images/check.svg" /> : 8 }</div><div className="stp-p-t">Адрес</div></li>
    </ul>
  </div>

export default Steps
