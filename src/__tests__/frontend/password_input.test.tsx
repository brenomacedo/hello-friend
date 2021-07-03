import { render, fireEvent } from '../../utils/tests'
import PasswordInput from '../../components/PasswordInput'
import { FiLock } from 'react-icons/fi'
import faker from 'faker'

const placeholder = 'Enter your password'

/*

    - Iniciar com o tipo 'password', ou seja, com a senha escondida [OK]
    - Ao digitar algo, o valor precisa ser inserido no input [OK]
    - Ao clicar no olho, ele precisa alterar a visibilidade da senha, para visivel ou invisivel [OK]
    - O valor inserido precisa permanecer [OK]
    - Ao clicar novamente, ele precisa alterar a visibilidade de volta [OK]
    - O valor inserido novamente precisa permanecer [OK]

*/

describe('Password input', () => {

    it('should initialize with the type password, i.e the password must be hidden', () => {

        const { getByPlaceholderText } = render(<PasswordInput Icon={FiLock} placeholder={placeholder} />)

        const input = getByPlaceholderText(placeholder)

        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('')
        expect(input).toHaveAttribute('type', 'password')

    })

    it('should display the value in the screen when the user type something', () => {

        const { getByPlaceholderText } = render(<PasswordInput Icon={FiLock} placeholder={placeholder} />)

        const input = getByPlaceholderText(placeholder)

        const password = faker.random.alphaNumeric()

        fireEvent.change(input, { target: { value: password } })

        expect(input).toHaveValue(password)

    })

    it('should change the input type when the user clicks on the eye and the display value must be the same', () => {

        const { getByPlaceholderText, getByRole } = render(<PasswordInput Icon={FiLock} placeholder={placeholder} />)

        const input = getByPlaceholderText(placeholder)
        let eye = getByRole('switch')

        const password = faker.random.alphaNumeric()

        fireEvent.change(input, { target: { value: password } })
        fireEvent.click(eye)

        expect(input).toHaveValue(password)
        expect(input).toHaveAttribute('type', 'text')

        eye = getByRole('switch')

        fireEvent.click(eye)

        expect(input).toHaveValue(password)
        expect(input).toHaveAttribute('type', 'password')


    })


})
