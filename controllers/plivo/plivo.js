import plivo from 'plivo';
import * as secrets from '../../config/secrets';

const plivoApi = plivo.RestAPI(secrets.plivo);
if(!!plivoApi) {
  console.log('Plivo API: setup successful!');
}
else {
  console.log('Plivo API: error');
}

/**
 * GET /plivo/account
 * Puxa todas as informações da conta do Plivo
 */
exports.getAccount = function(req, res) {
  plivoApi.get_account({}, function(status, response) {
    if(status !== 200) {
      return res.send({
        success: false,
        message: 'Falha ao comunicar com a API do Plivo.',
      });
    }

    return res.send({
      success: true,
      data: {
        accountType       : response.account_type,
        autoRecharge      : response.auto_recharge,
        timeZone          : response.timezone,
        remainingCredits  : response.cash_credits,
      },
    });
  });
};

/**
 * GET /plivo/messages
 * Retorna todos os sms enviados
 */
exports.getMessages = function(req, res) {
  plivoApi.get_messages({ limit: 5 }, function(status, response) {
    if(status !== 200) {
      return res.send({
        success: false,
        message: 'Falha ao comunicar com a API do Plivo.',
      });
    }

    return res.send({
      success: true,
      data: response.objects,
    });
  });
};

/**
 * POST /plivo/messages
 * Send a send_message request to Plivo API
 */
exports.sendMessage = function(req, res) {
  const body = req.body;
  const params = {
    'src': '28908',
    'dst': body.dst,
    'text': body.text,
  };

  plivoApi.send_message(params, function(status, response) {
    if(status !== 200) {
      return res.send({
        success: false,
        message: response.error,
      });
    }

    return res.send({
      success: true,
      message: 'SMS enviada com sucesso!',
    });
  });
}
