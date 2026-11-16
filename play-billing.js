(function () {
  if (!('getDigitalGoodsService' in window)) return;
  var SKU = { noads: 'remove_ads', starter: 'pack_starter', angel5: 'angels_5', angel15: 'angels_15', ninja: 'char_ninja', fox: 'char_fox', wizard: 'char_wizard', angel: 'char_angel', hero: 'char_hero' };
  var CONSUMABLE = { angel5: 1, angel15: 1 };
  window.EMO_BILLING = async function (id, done) {
    try {
      var svc = await window.getDigitalGoodsService('https://play.google.com/billing');
      var req = new PaymentRequest([{ supportedMethods: 'https://play.google.com/billing', data: { sku: SKU[id] } }]);
      var res = await req.show();
      var token = res.details.purchaseToken;
      await res.complete('success');
      if (CONSUMABLE[id]) await svc.consume(token); else await svc.acknowledge(token, 'onetime');
      done(true);
    } catch (e) { done(false); }
  };
})();
