import React from 'react';
import Confetti from '../confetti';
import './success-modal.scss'

function SuccessModal({onNext, isLastStage, isLastLevel}) {

	console.log('SuccessModal', { onNext, isLastStage, isLastLevel });
	return (
		<div className="modal fade show" id="success-modal" role="dialog" aria-hidden="true">
			<Confetti/>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="success modal-body">
						<h2>¡MUY BIEN!</h2>
            {!isLastLevel && isLastStage && (
              <h3>¡Has completado este nivel!</h3>
            )}
            {isLastLevel && isLastStage && (
              <h3>¡Has completado todos los niveles!</h3>
            )}
					</div>
					<div className="modal-footer">
            {isLastLevel && isLastStage ? (
              <button className="btn btn-success">Volver al menú</button>
            ) : (
              <button className="btn btn-success" onClick={() => onNext()}>
                {(isLastStage ? '¡Terminado! Continúa' : 'Seguir' )}
              </button>
            )}
					
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuccessModal;