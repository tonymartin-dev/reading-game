import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './prueba-fn.scss';

let numero = 0;

let suma = () => {
	numero++
	console.log(numero);
};

let lang = 'es'

function PruebaFn(props){

	console.log(props)

	// Declare a new state variable, which we'll call "count"
	const [count, setCount] = useState(0);
	const [t, i18n] = useTranslation();
	
	let refresh = () => {
		setCount(count + 1)
	}

	const toggleLang = ()=>{
		lang = lang === 'es' ? 'en' : 'es';
		i18n.changeLanguage(lang);
	}

	return (
		<div className="prueba">
			<h1>Haciendo Pruebas</h1>
			<span>Prueba: {numero}</span>
			<p>{t('LABEL_1')}</p>
			<button className="btn" onClick={()=>toggleLang()}>Change language</button>
			<button onClick={() => suma()}>Suma</button>
			<button onClick={() => refresh()}>Refresh</button>
		</div>
	);
	
}

export default PruebaFn