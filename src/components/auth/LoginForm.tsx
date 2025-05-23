import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../supabase/auth'
import AuthLayout from './AuthLayout'

export default function LoginForm() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const { signIn } = useAuth()
	const navigate = useNavigate()
	const [rememberEmail, setRememberEmail] = useState(false)

	useEffect(() => {
		const savedEmail = localStorage.getItem('rememberedEmail')
		if (savedEmail) {
			setEmail(savedEmail)
			setRememberEmail(true)
		}
	}, [])

	useEffect(() => {
		if (rememberEmail) {
			localStorage.setItem('rememberedEmail', email)
		} else {
			localStorage.removeItem('rememberedEmail')
		}
	}, [email, rememberEmail])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await signIn(email, password)
			navigate('/dashboard')
		} catch (error) {
			setError('Invalid email or password')
		}
	}

	return (
		<AuthLayout>
			<div className="w-full max-w-md p-8 mx-auto border shadow-lg bg-gray-800/30 backdrop-blur-md rounded-2xl border-gray-700/50">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="email" className="text-sm font-medium text-gray-300">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className="h-12 text-white border-gray-600 rounded-lg bg-gray-700/50 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password" className="text-sm font-medium text-gray-300">
								Password
							</Label>
							<Link
								to="/forgot-password"
								className="text-sm font-medium text-blue-400 hover:text-blue-300"
							>
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							className="h-12 text-white border-gray-600 rounded-lg bg-gray-700/50 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					{error && <p className="text-sm text-red-400">{error}</p>}

					<div>
						<Button
							type="submit"
							className="w-full h-12 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700"
						>
							Sign in
						</Button>

						<div className="flex items-center justify-start gap-2 mt-2">
							<div className="relative">
								<input
									id="remember-email"
									type="checkbox"
									checked={rememberEmail}
									onChange={() => setRememberEmail(v => !v)}
									className="transition-all duration-150 bg-gray-700 border border-gray-600 rounded-sm appearance-none size-3 peer checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500"
									style={{ minWidth: 16, minHeight: 16 }}
								/>
								{rememberEmail && (
									<span className="absolute flex items-center justify-center pointer-events-none left-0.5 size-3 top-1">
										<Check className="text-white size-3" />
									</span>
								)}
							</div>
							<label
								htmlFor="remember-email"
								className="text-xs text-gray-400 cursor-pointer select-none "
							>
								Remember me?
							</label>
						</div>
					</div>

					<div className="mt-6 text-sm text-center text-gray-400">
						Don't have an account?{' '}
						<Link to="/signup" className="font-medium text-blue-400 hover:underline">
							Sign up
						</Link>
					</div>
				</form>
			</div>
		</AuthLayout>
	)
}
