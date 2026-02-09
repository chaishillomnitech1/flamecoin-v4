const FlameCoinAsset = require('../src/FlameCoinAsset');

describe('FlameCoinAsset', () => {
  let flameCoin;

  beforeEach(() => {
    flameCoin = new FlameCoinAsset();
  });

  test('should initialize with correct total supply', () => {
    expect(flameCoin.totalSupply).toBe(21.6e12);
  });

  test('should have correct symbol', () => {
    expect(flameCoin.symbol).toBe('FLM4');
  });

  test('should have correct name', () => {
    expect(flameCoin.name).toBe('FlameCoin V4');
  });

  test('should initialize successfully', () => {
    const result = flameCoin.initialize();
    expect(result.success).toBe(true);
    expect(result.asset).toBe('FLM4');
    expect(result.supply).toBe(21.6e12);
    expect(result.protection).toBe(true);
  });

  test('should enable protection', () => {
    flameCoin.protectionEnabled = false;
    flameCoin.enableProtection();
    expect(flameCoin.protectionEnabled).toBe(true);
  });

  test('should start security monitoring', () => {
    flameCoin.securityMonitoring = false;
    flameCoin.startSecurityMonitoring();
    expect(flameCoin.securityMonitoring).toBe(true);
  });

  test('should generate unique asset identifiers', () => {
    const id1 = flameCoin.generateAssetIdentifier();
    const id2 = flameCoin.generateAssetIdentifier();
    
    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1).not.toBe(id2);
    expect(id1.length).toBe(64); // SHA256 hash length
  });

  test('should generate QR code successfully', async () => {
    const result = await flameCoin.generateQRCode('test-data');
    
    expect(result.success).toBe(true);
    expect(result.qrCode).toBeDefined();
    expect(result.identifier).toBeDefined();
    expect(result.qrCode).toMatch(/^data:image\/png;base64,/);
  });

  test('should pass security review', () => {
    flameCoin.initialize();
    const result = flameCoin.performSecurityReview();
    
    expect(result.passed).toBe(true);
    expect(result.checks.protectionEnabled).toBe(true);
    expect(result.checks.monitoringActive).toBe(true);
    expect(result.checks.operationalStatus).toBe(true);
    expect(result.checks.totalSupplyValid).toBe(true);
  });

  test('should return correct status', () => {
    const status = flameCoin.getStatus();
    
    expect(status.name).toBe('FlameCoin V4');
    expect(status.symbol).toBe('FLM4');
    expect(status.totalSupply).toBe(21.6e12);
    expect(status.protection).toBe(true);
    expect(status.monitoring).toBe(true);
    expect(status.operational).toBe('active');
  });
});
