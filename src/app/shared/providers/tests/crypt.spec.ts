import { Crypt } from '../crypt';

describe('Crypt', () => {
  it('Should return correctly hash value', async () => {
    // Arrange
    const password = 'password';

    // Act
    const hashedPassword = await Crypt.hash(password);

    // Assert
    expect(password).not.toEqual(hashedPassword);
  });

  it('Should compare equal password correctly', async () => {
    // Arrange
    const password = 'any_password';
    const hashedPassword = await Crypt.hash(password);

    // Act
    const result = await Crypt.compare(password, hashedPassword);

    // Assert
    expect(result).toBeTruthy();
  });

  it('Should compare different password correctly', async () => {
    // Arrange
    const password = 'any_password';
    const hashedPassword = await Crypt.hash(password);

    // Act
    const result = await Crypt.compare(password, `${hashedPassword}a`);

    // Assert
    expect(result).toBeFalsy();
  });
});
