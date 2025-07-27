export default function UserInfo({ action, textBtn }) {
	return (
		<div>
			<h1>Please create an account, before continuing</h1>

			<form action={action}>
				<div>
					<label>Your unique username</label>
					<input name="username" type="text" required />
				</div>

				<div>
					<label>Share something about yourself</label>
					<input name="bio" type="text" required />
				</div>

				{error && <p className="text-orange-700">{error}</p>}

				<button type="submit">{textBtn}</button>
			</form>
		</div>
	);
}
