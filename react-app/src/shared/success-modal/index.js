import React from 'react';
import Confetti from '../confetti';
import './success-modal.scss'

function SuccessModal(props) {

	console.log('SuccessModal', { props });
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
					</div>
					<div className="modal-footer">
						<button className="btn btn-success" onClick={() => props.onNext()}>
							{(props.isLastStage ? '¡Terminado! Continúa' : 'Seguir' )}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SuccessModal;