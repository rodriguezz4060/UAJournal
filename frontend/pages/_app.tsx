import { Header } from '../components/Header'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from '../theme'
import { wrapper } from '../redux/store'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import 'macro-css'
import { setUserData } from '../redux/slices/user'
import { Api } from '../utils/api'
import NextNProgress from '../components/Progressbar'

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<MuiThemeProvider theme={theme}>
				<Header />
				<Component {...pageProps} />
				<NextNProgress />
			</MuiThemeProvider>
		</>
	)
}

App.getInitialProps = wrapper.getInitialAppProps(
	store =>
		async ({ ctx, Component }) => {
			try {
				const userData = await Api(ctx).user.getMe()

				store.dispatch(setUserData(userData))
			} catch (err) {
				if (ctx.asPath === '/write') {
					if (ctx.res) {
						ctx.res.writeHead(302, {
							Location: '/403'
						})
					}
					if (ctx.res) {
						ctx.res.end()
					}
				}
				console.log(err)
			}

			return {
				pageProps: Component.getInitialProps
					? await Component.getInitialProps({ ...ctx, store })
					: {}
			}
		}
)

export default wrapper.withRedux(App)
