export default function UserInfo({ action, textBtn, userId }) {
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

				<input name="clerk_id" type="text" hidden aria-hidden>
					{userId}
				</input>

				<button type="submit">{textBtn}</button>
			</form>
		</div>
	);
}
