// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendConfirmationEmail = async ({ username, email, confirmationToken }) => {
//   const message = {
//     to: email,
//     from: process.env.EMAIL_FROM,
//     templateId: 'd-6dfcb7a3a5c3499b9aa32bb9816794af',
//     dynamicTemplateData: {
//       email: email,
//       confirmationToken: `http://localhost:4000/auth/confirm/${confirmationToken}`,
//     },
//   };

//   try {
//     await sgMail.send(message);
//     console.log('Email de confirmación enviado');
//   } catch (error) {
//     // Imprimir más detalles sobre el error
//     if (error.response) {
//       console.error('Response error:', error.response.body); // Imprimir el cuerpo del error de la respuesta
//     } else {
//       console.error('Error enviando email de confirmación:', error);
//     }
//     // Lanzar un error con el mensaje original para seguir la ejecución del error en el catch de más arriba en la cadena de llamadas
//     throw new Error('Error enviando email de confirmación');
//   }
// };

// module.exports = {
//   sendConfirmationEmail,
// };


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = async ({ username, email, confirmationToken }) => {
  const confirmationUrl = `http://localhost:4000/auth/confirm/${confirmationToken}`;
  const message = {
    to: email,
    from: process.env.EMAIL_FROM,
    subject: 'Confirm your email',
    text: `HI! ${username},please confirm your email by clicking on the following link: ${confirmationUrl}`,
    html: `<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 700px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: arial,helvetica,sans-serif;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#e0d5b3;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#e0d5b3">
            <tr>
              <td valign="top" bgcolor="#e0d5b3" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="700">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:700px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#E0D5B3" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p>Welcome Hotel Esmeralda Resort & SPA!</p>
      </td>
    </tr>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0fd7a287-e017-4d1b-87f0-bf7e517f6406" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:15px 10px 20px 0px; line-height:16px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: right"><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 12px"><em>Email not displaying correctly?</em></span></div>
<div style="font-family: inherit; text-align: right"><span style="font-family: &quot;times new roman&quot;, times, serif; color: #c29a1f; font-size: 12px"><strong>View it</strong></span><span style="font-family: &quot;times new roman&quot;, times, serif; font-size: 12px"><em> in your browser.</em></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 0px 0px 0px;" bgcolor="" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="700" style="width:700px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="eb8f13b4-163e-4e06-b97a-299f04852feb">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="700" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://i.ibb.co/PYq4n7C/esmeralda.png">
          
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:20px 0px 0px 0px;" bgcolor="#F4F0E4" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="680" style="width:680px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9f929b4b-e5da-486f-bdda-59da318ed1ea.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 60px 0px 60px; line-height:28px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: &quot;times new roman&quot;, times, serif; color: #403101; font-size: 20px"><em>Thank you so much for being Hotel Esmeralda Resort & SPA customer and part of our family!</em></span></div>
<div style="font-family: inherit; text-align: center"><span style="font-family: &quot;times new roman&quot;, times, serif; color: #403101; font-size: 20px"><em>Confirm your email ${email} now at the link </em></span><span style="font-family: &quot;times new roman&quot;, times, serif; color: #c29a1f; font-size: 20px"><strong> below</strong></span><span style="font-family: &quot;times new roman&quot;, times, serif; color: #403101; font-size: 20px"><em>!</em></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="183cbc8c-7906-496a-8e51-d93e0f2a294a">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:25px 0px 30px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#5a8dbb" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href='${confirmationUrl}'style="background-color:#fcd34d; border:0px solid #333333; border-color:#333333; border-radius:0px; border-width:0px; color:#F8F9FA; display:inline-block; font-size:16px; font-weight:normal; letter-spacing:2px; line-height:normal; padding:20px 60px 20px 60px; text-align:center; text-decoration:none; border-style:solid; font-family:times new roman,times,serif;" target="_blank">CONFIRM YOUR EMAIL</a></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:60px 60px 0px 60px;" bgcolor="" data-distribution="1,1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="270" style="width:270px; border-spacing:0; border-collapse:collapse; margin:0px 20px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d729fa69-2b5f-464d-bcc1-1a4e0f89bf4f" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 20px 18px 20px; line-height:22px; text-align:inherit; background-color:#CADAE6;" height="100%" valign="top" bgcolor="#CADAE6" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #403101; font-size: 18px; font-family: impact, sans-serif"><strong>ROOMS</strong></span></div>
<div style="font-family: inherit; text-align: center"><span style="color: #403101; font-size: 18px; font-family: &quot;times new roman&quot;, times, serif">Each of our bright, well-lit rooms is equipped with everything you need for a comfortable stay.</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="2c903bd9-3fbb-42e3-bb23-f64a89c0f5e4">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="270" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://www.manila-hotel.com.ph/wp-content/uploads/2020/06/Pres-Suite-1-DSC_1906-scaled.jpg">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="56b303e9-d553-4d45-a0a7-85a233e7d395.1.1">
    <tbody>
      <tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="270" style="width:270px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 20px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="ae0fb97b-bda8-4335-b80f-e2112a591992">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="270" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/4cc7b835-ec3b-485d-8ebf-f615b20be013/2527x1685.jpg">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a2918bd2-c639-422b-a4d7-e75d7a3f1600" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 20px 18px 20px; line-height:22px; text-align:inherit; background-color:CADAE6;" height="100%" valign="top" bgcolor="CADAE6" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #403101; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-family: impact, sans-serif">RESTAURANT</span></div>
<div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #403101; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial">Crafting exquisite culinary experiences, our chefs infuse passion and creativity into every dish.</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="56b303e9-d553-4d45-a0a7-85a233e7d395">
    <tbody>
      <tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 60px 20px 60px;" bgcolor="" data-distribution="1,1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="270" style="width:270px; border-spacing:0; border-collapse:collapse; margin:0px 20px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="dec21d03-7557-4443-8a19-a11b10e7e563.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 20px 18px 20px; line-height:22px; text-align:inherit; background-color:CADAE6;" height="100%" valign="top" bgcolor="CADAE6" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #403101; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-family: impact, sans-serif">SPA</span></div>
<div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #403101; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial">Feel relaxation and luxury in our SPA</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e8fddea0-e5a5-4812-a1d3-e0e618ec2a7c.1">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="270" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/d92b82bb-8399-4bf4-b0ef-c62e44a4ae86/2808x1872.jpg">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="56b303e9-d553-4d45-a0a7-85a233e7d395.1.2">
    <tbody>
      <tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="270" style="width:270px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 20px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b3af1952-553a-4e40-b855-0104b443f11c.1">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="270" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/fa70730b-8ff0-4d61-b120-54930bc783a1/2016x1344.jpg">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="81519ce8-7ef2-44f0-abc8-cba1868d954e.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 20px 18px 20px; line-height:22px; text-align:inherit; background-color:CADAE6;" height="100%" valign="top" bgcolor="CADAE6" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: bold; font-stretch: inherit; line-height: inherit; font-size: 18px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #403101; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; font-family: impact, sans-serif">CREDIT CARDS</span></div>
<div style="font-family: inherit; text-align: center"><span style="box-sizing: border-box; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-style: inherit; font-variant-ligatures: inherit; font-variant-caps: inherit; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: &quot;times new roman&quot;, times, serif; font-size: 18px; vertical-align: baseline; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-top-style: initial; border-right-style: initial; border-bottom-style: initial; border-left-style: initial; border-top-color: initial; border-right-color: initial; border-bottom-color: initial; border-left-color: initial; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; color: #403101; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial">Different payment methods.</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="56b303e9-d553-4d45-a0a7-85a233e7d395.1">
    <tbody>
      <tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:60px 60px 0px 60px;" bgcolor="#F4F0E4" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="580" style="width:580px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="886edc65-89c5-48f5-8601-956ceefef8e8" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 0px 15px 0px; line-height:20px; text-align:inherit; background-color:#F4F0E4;" height="100%" valign="top" bgcolor="#F4F0E4" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #403101; font-family: impact, sans-serif; font-size: 24px"><strong>BENEFITS</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="886edc65-89c5-48f5-8601-956ceefef8e8.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px; line-height:24px; text-align:inherit; background-color:#F4F0E4;" height="100%" valign="top" bgcolor="#F4F0E4" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-family: &quot;times new roman&quot;, times, serif; color: #403101; font-size: 20px"><em>Enjoy all the services we offer.</em></span></div>
<div style="font-family: inherit; text-align: center"><span style="font-family: &quot;times new roman&quot;, times, serif; color: #403101; font-size: 20px"><em>Come to the best hotel</em></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 80px 60px 80px;" bgcolor="#F4F0E4" data-distribution="1,1,1,1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="135" style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="886edc65-89c5-48f5-8601-956ceefef8e8.1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:20px 0px 20px 0px; line-height:26px; text-align:inherit; background-color:#F4F0E4;" height="100%" valign="top" bgcolor="#F4F0E4" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: &quot;times new roman&quot;, times, serif; color: #c29a1f; font-size: 26px"><strong>Room Service</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="135" style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="886edc65-89c5-48f5-8601-956ceefef8e8.1.1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:20px 0px 20px 0px; line-height:26px; text-align:inherit; background-color:#F4F0E4;" height="100%" valign="top" bgcolor="#F4F0E4" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: &quot;times new roman&quot;, times, serif; color: #c29a1f; font-size: 26px"><strong>Room upgrades</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="135" style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-2">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="886edc65-89c5-48f5-8601-956ceefef8e8.1.1.1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:20px 0px 20px 0px; line-height:26px; text-align:inherit; background-color:#F4F0E4;" height="100%" valign="top" bgcolor="#F4F0E4" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: &quot;times new roman&quot;, times, serif; font-size: 26px; color: #c29a1f"><strong>Resort &</strong></span></div>
<div style="font-family: inherit; text-align: center"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: &quot;times new roman&quot;, times, serif; font-size: 26px; color: #c29a1f"><strong>SPA</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="135" style="width:135px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-3">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="886edc65-89c5-48f5-8601-956ceefef8e8.1.1.1.1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:20px 0px 20px 0px; line-height:26px; text-align:inherit; background-color:#F4F0E4;" height="100%" valign="top" bgcolor="#F4F0E4" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: &quot;times new roman&quot;, times, serif; font-size: 26px; color: #c29a1f"><strong>Rental</strong></span></div>
<div style="font-family: inherit; text-align: center"><span style="font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-family: &quot;times new roman&quot;, times, serif; font-size: 26px; color: #c29a1f"><strong>car</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:60px 0px 20px 0px;" bgcolor="" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="680" style="width:680px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="11fddd65-fe7b-47d5-b90c-36833a402f60">
    <tbody>
      <tr>
        <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px;" align="center">
          <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
            <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://www.facebook.com/sendgrid/" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#403101; height:22px; width:22px;">
        <img role="social-icon" alt="Facebook" title="Facebook" src="https://mc.sendgrid.com/assets/social/white/facebook.png" style="height:22px; width:22px;" height="22" width="22">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://twitter.com/sendgrid" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#403101; height:22px; width:22px;">
        <img role="social-icon" alt="Twitter" title="Twitter" src="https://mc.sendgrid.com/assets/social/white/twitter.png" style="height:22px; width:22px;" height="22" width="22">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://www.instagram.com/sendgrid/" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#403101; height:22px; width:22px;">
        <img role="social-icon" alt="Instagram" title="Instagram" src="https://mc.sendgrid.com/assets/social/white/instagram.png" style="height:22px; width:22px;" height="22" width="22">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://www.pinterest.com/sendgrid/" target="_blank" alt="Pinterest" title="Pinterest" style="display:inline-block; background-color:#403101; height:22px; width:22px;">
        <img role="social-icon" alt="Pinterest" title="Pinterest" src="https://mc.sendgrid.com/assets/social/white/pinterest.png" style="height:22px; width:22px;" height="22" width="22">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://www.linkedin.com/company/sendgrid/" target="_blank" alt="LinkedIn" title="LinkedIn" style="display:inline-block; background-color:#403101; height:22px; width:22px;">
        <img role="social-icon" alt="LinkedIn" title="LinkedIn" src="https://mc.sendgrid.com/assets/social/white/linkedin.png" style="height:22px; width:22px;" height="22" width="22">
      </a>
    </td></tr></tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#403101; font-size:12px; line-height:20px; padding:20px 16px 20px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-family:times new roman,times,serif; font-size:12px; line-height:20px;">Hotel Esmeralda Resort & SPA</p><p style="font-family:times new roman,times,serif; font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">Buenos Aires, Argentina</span>, <span class="Unsubscribe--senderCity"></span>, <span class="Unsubscribe--senderState"></span> <span class="Unsubscribe--senderZip">B1657</span></p></div><p style="font-family:times new roman,times,serif; font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="" target="_blank" style="color:#C29A1F;"></a></p></div><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="51e9038b-1d42-4d4b-b954-d2f2ade99683">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:20px 0px 20px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#F5F8FD" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`,
  };

  try {
    await sgMail.send(message);
    console.log('Email de confirmación enviado');
  } catch (error) {
    // Imprimir más detalles sobre el error
    if (error.response) {
      console.error('Response error:', error.response.body); // Imprimir el cuerpo del error de la respuesta
    } else {
      console.error('Error enviando email de confirmación:', error);
    }
    // Lanzar un error con el mensaje original para seguir la ejecución del error en el catch de más arriba en la cadena de llamadas
    throw new Error('Error enviando email de confirmación');
  }
};

module.exports = {
  sendConfirmationEmail,
};
