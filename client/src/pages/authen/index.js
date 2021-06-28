import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppBar, Tabs, Tab, Paper, Container } from '@material-ui/core';
import SignIn from '../../container/signin';
import SignUp from '../../container/signup';

function Authen() {
	const [value, setValue] = useState(0);

	const { t, i18n } = useTranslation();
	const auth = useSelector((state) => state.auth);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container maxWidth='sm' style={{ paddingTop: '1rem' }}>
			<Helmet>
				<html lang={i18n.language || 'en'} />
				<title>Login/Register | Fine Job</title>
			</Helmet>
			<Paper>
				<AppBar position='static'>
					<Tabs
						value={value}
						onChange={handleChange}
						TabIndicatorProps={{ style: { background: '#ffc400' } }}>
						<Tab label={t('authPage.login')} disabled={auth.isLoading} />
						<Tab label={t('authPage.register')} disabled={auth.isLoading} />
					</Tabs>
				</AppBar>
				<div style={{ padding: '1rem' }} value={value}>
					{value === 0 ? <SignIn /> : <SignUp />}
				</div>
			</Paper>
		</Container>
	);
}

export default Authen;
