import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors } from './theme';
import { contact, faq, plans } from './data';

const LOGO = require('./assets/logo.png');

function openUrl(url) {
  Linking.openURL(url).catch(() => Alert.alert('Unable to open link', 'Please try again.'));
}

function Header({ title, subtitle, showBack, onBack }) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable onPress={onBack} style={styles.backButton} accessibilityRole="button">
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>
      ) : (
        <Image source={LOGO} style={styles.headerLogo} resizeMode="contain" />
      )}
      <View style={styles.headerTextWrap}>
        <Text style={styles.headerTitle}>{title}</Text>
        {!!subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

function Pill({ children, tone = 'red' }) {
  const toneStyle = tone === 'green' ? styles.pillGreen : tone === 'cream' ? styles.pillCream : styles.pillRed;
  return (
    <View style={[styles.pill, toneStyle]}>
      <Text style={styles.pillText}>{children}</Text>
    </View>
  );
}

function PrimaryButton({ label, onPress, light = false }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.primaryButton, light && styles.primaryButtonLight, pressed && styles.pressed]}>
      <Text style={[styles.primaryButtonText, light && styles.primaryButtonTextDark]}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function HomeScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Image source={LOGO} style={styles.heroLogo} resizeMode="contain" />
        <Text style={styles.heroEyebrow}>AUTO WRAP COVERAGE</Text>
        <Text style={styles.heroTitle}>Drive Covered.{`\n`}Drive Confident.</Text>
        <Text style={styles.heroCopy}>Vehicle service contract options designed around eligible vehicles, budgets, and driving needs.</Text>
        <View style={styles.heroButtonRow}>
          <PrimaryButton label="Get a Free Quote" onPress={() => navigate('Quote')} />
          <SecondaryButton label="Call Now" onPress={() => openUrl(`tel:${contact.phoneDial}`)} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionKicker}>QUICK ACCESS</Text>
        <Text style={styles.sectionTitle}>How can we help?</Text>
        <View style={styles.grid}>
          <QuickCard title="View Plans" subtitle="Compare available coverage" marker="01" onPress={() => navigate('Plans')} />
          <QuickCard title="Claims & Repairs" subtitle="Get help starting a claim" marker="02" onPress={() => navigate('Claims')} />
          <QuickCard title="Customer Portal" subtitle="Account access is coming next" marker="03" onPress={() => navigate('Portal')} />
          <QuickCard title="Contact Us" subtitle="Call, email, or message us" marker="04" onPress={() => navigate('Contact')} />
        </View>
      </View>

      <View style={styles.darkFeature}>
        <Pill tone="cream">WHY AUTO WRAP</Pill>
        <Text style={styles.darkFeatureTitle}>Protection backed by industry experience.</Text>
        <Text style={styles.darkFeatureCopy}>Auto Wrap works with established vehicle service contract administrators and financing partners to help provide eligible customers with flexible protection options and nationwide support.</Text>
        <Pressable onPress={() => navigate('About')} style={styles.inlineLinkButton}>
          <Text style={styles.inlineLinkText}>Learn more about Auto Wrap →</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionKicker}>POPULAR OPTIONS</Text>
        <Text style={styles.sectionTitle}>Plans designed for different vehicles.</Text>
        {plans.map((plan) => (
          <PlanPreview key={plan.id} plan={plan} onPress={() => navigate('Plans')} />
        ))}
      </View>
    </ScrollView>
  );
}

function QuickCard({ title, subtitle, marker, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickCard, pressed && styles.pressed]}>
      <View style={styles.quickMarker}><Text style={styles.quickMarkerText}>{marker}</Text></View>
      <Text style={styles.quickTitle}>{title}</Text>
      <Text style={styles.quickSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

function PlanPreview({ plan, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.planPreview, pressed && styles.pressed]}>
      <View style={styles.planStripe} />
      <View style={styles.planPreviewBody}>
        <Text style={styles.planPreviewTitle}>{plan.name}</Text>
        <Text style={styles.planPreviewCopy}>{plan.summary}</Text>
        <Text style={styles.planPreviewPrice}>{plan.price}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

function PlansScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="Coverage Plans" subtitle="Options for eligible vehicles" />
      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Plan availability is based on vehicle eligibility.</Text>
        <Text style={styles.noticeCopy}>Coverage, exclusions, waiting periods, limits, and other terms are governed by the applicable vehicle service contract. Request a quote for plan availability specific to your vehicle.</Text>
      </View>
      {plans.map((plan, index) => (
        <View key={plan.id} style={styles.planCard}>
          <View style={styles.planNumber}><Text style={styles.planNumberText}>0{index + 1}</Text></View>
          <Text style={styles.planCardTitle}>{plan.name}</Text>
          <Text style={styles.planCardSummary}>{plan.summary}</Text>
          <View style={styles.rule} />
          <Text style={styles.planLabel}>ELIGIBILITY</Text>
          <Text style={styles.planDetail}>{plan.eligibility}</Text>
          <Text style={styles.planLabel}>DISPLAYED WEBSITE PRICE</Text>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <PrimaryButton label="Request a Quote" onPress={() => navigate('Quote')} />
        </View>
      ))}
    </ScrollView>
  );
}

function QuoteScreen() {
  const initial = { name: '', phone: '', email: '', year: '', make: '', model: '', mileage: '' };
  const [form, setForm] = useState(initial);
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  function submit() {
    if (!form.name.trim() || !form.phone.trim() || !form.year.trim() || !form.make.trim() || !form.model.trim()) {
      Alert.alert('A few details are missing', 'Please enter your name, phone number, and basic vehicle information.');
      return;
    }
    const subject = encodeURIComponent('Auto Wrap Mobile App Quote Request');
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'Not provided'}\nVehicle: ${form.year} ${form.make} ${form.model}\nMileage: ${form.mileage || 'Not provided'}\n\nPlease contact me about Auto Wrap coverage options.`
    );
    openUrl(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.screenContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Header title="Free Quote" subtitle="Tell us about your vehicle" />
        <View style={styles.quoteIntro}>
          <Text style={styles.quoteIntroTitle}>Find an option that fits your vehicle.</Text>
          <Text style={styles.quoteIntroCopy}>This Phase 1 form prepares an email to Auto Wrap with your quote details. Direct in-app quote submission can be connected in the next backend phase.</Text>
        </View>
        <FormField label="Your name" value={form.name} onChangeText={(v) => set('name', v)} placeholder="First and last name" />
        <FormField label="Phone" value={form.phone} onChangeText={(v) => set('phone', v)} placeholder="(555) 555-5555" keyboardType="phone-pad" />
        <FormField label="Email" value={form.email} onChangeText={(v) => set('email', v)} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
        <View style={styles.twoCol}>
          <View style={styles.half}><FormField label="Year" value={form.year} onChangeText={(v) => set('year', v)} placeholder="2021" keyboardType="number-pad" /></View>
          <View style={styles.half}><FormField label="Mileage" value={form.mileage} onChangeText={(v) => set('mileage', v)} placeholder="65,000" keyboardType="number-pad" /></View>
        </View>
        <FormField label="Make" value={form.make} onChangeText={(v) => set('make', v)} placeholder="Chevrolet" />
        <FormField label="Model" value={form.model} onChangeText={(v) => set('model', v)} placeholder="Equinox" />
        <PrimaryButton label="Send Quote Request" onPress={submit} />
        <Text style={styles.helperText}>Or call {contact.phoneDisplay} to speak with Auto Wrap.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FormField(props) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{props.label}</Text>
      <TextInput {...props} style={styles.input} placeholderTextColor="#9A968E" />
    </View>
  );
}

function FaqScreen() {
  const [open, setOpen] = useState(0);
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="Frequently Asked Questions" subtitle="Quick answers about coverage" />
      {faq.map((item, index) => {
        const active = open === index;
        return (
          <View key={item.q} style={styles.faqCard}>
            <Pressable onPress={() => setOpen(active ? -1 : index)} style={styles.faqQuestion}>
              <Text style={styles.faqQuestionText}>{item.q}</Text>
              <Text style={styles.faqToggle}>{active ? '−' : '+'}</Text>
            </Pressable>
            {active && (
              <View style={styles.faqAnswerWrap}>
                {item.a ? (
                  <Text style={styles.faqAnswer}>{item.a}</Text>
                ) : (
                  <>
                    <Text style={styles.faqAnswer}>The exact website answer for this question was not visible in the screenshots provided, so this Phase 1 build does not invent contract guidance.</Text>
                    <Pressable onPress={() => openUrl(contact.website)}><Text style={styles.redLink}>View AutoWrapCoverage.com →</Text></Pressable>
                  </>
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

function ContactScreen() {
  const mapUrl = useMemo(() => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`, []);
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="Get in Touch" subtitle="We’re here when you need us" />
      <View style={styles.contactHero}>
        <Text style={styles.contactHeroTitle}>Questions about coverage?</Text>
        <Text style={styles.contactHeroCopy}>Call or email Auto Wrap, or get directions to our Dover, Delaware office.</Text>
      </View>
      <ContactCard label="CALL AUTO WRAP" value={contact.phoneDisplay} action="Tap to call" onPress={() => openUrl(`tel:${contact.phoneDial}`)} />
      <ContactCard label="EMAIL SUPPORT" value={contact.email} action="Tap to email" onPress={() => openUrl(`mailto:${contact.email}`)} />
      <ContactCard label="BUSINESS ADDRESS" value={contact.address} action="Open in Maps" onPress={() => openUrl(mapUrl)} />
      <View style={styles.contactFooterCard}>
        <Text style={styles.contactFooterTitle}>Need a quote?</Text>
        <Text style={styles.contactFooterCopy}>Call {contact.phoneDisplay} or use the Quote tab to prepare your request.</Text>
      </View>
    </ScrollView>
  );
}

function ContactCard({ label, value, action, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.contactCard, pressed && styles.pressed]}>
      <Text style={styles.contactLabel}>{label}</Text>
      <Text style={styles.contactValue}>{value}</Text>
      <Text style={styles.contactAction}>{action} →</Text>
    </Pressable>
  );
}

function AboutScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="Who Are We?" subtitle="About Auto Wrap" showBack onBack={() => navigate('More')} />
      <View style={styles.aboutHero}>
        <Image source={LOGO} style={styles.aboutLogo} resizeMode="contain" />
        <Text style={styles.aboutTitle}>Vehicle protection with clear communication at the center.</Text>
      </View>
      <Text style={styles.bodyText}>Auto Wrap provides vehicle protection plans and extended service contract options designed to help eligible drivers manage unexpected mechanical and electrical repair costs.</Text>
      <Text style={styles.bodyText}>The company works with established administrators to offer coverage options for different vehicle ages, mileage ranges, budgets, and driving needs. Available benefits and coverage are governed by the applicable service contract.</Text>
      <Text style={styles.bodyText}>Auto Wrap’s public website emphasizes transparency, customer care, straightforward terms, and helping customers understand the protection they are considering.</Text>
      <View style={styles.disclosureCard}>
        <Text style={styles.disclosureTitle}>Independent provider</Text>
        <Text style={styles.disclosureText}>Auto Wrap is an independent, third-party provider of vehicle service contracts and is not affiliated with an automotive manufacturer or government agency.</Text>
      </View>
    </ScrollView>
  );
}

function ClaimsScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="Claims & Repairs" subtitle="Get help with an existing contract" showBack onBack={() => navigate('Home')} />
      <View style={styles.claimsCard}>
        <Pill tone="cream">CUSTOMER SUPPORT</Pill>
        <Text style={styles.claimsTitle}>Need to start a claim or repair request?</Text>
        <Text style={styles.claimsCopy}>For Phase 1, the app gives customers a direct path to Auto Wrap support. In the next customer-portal phase, we can connect contract-specific administrator information, claim submission, documents, and claim status.</Text>
        <PrimaryButton label={`Call ${contact.phoneDisplay}`} onPress={() => openUrl(`tel:${contact.phoneDial}`)} light />
        <View style={styles.buttonSpacer} />
        <SecondaryButton label="Email Support" onPress={() => openUrl(`mailto:${contact.email}`)} />
      </View>
      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Before repair work begins</Text>
        <Text style={styles.noticeCopy}>Customers should follow the claim and authorization requirements in their specific vehicle service contract. Coverage and claim procedures can vary by administrator and contract.</Text>
      </View>
    </ScrollView>
  );
}

function PortalScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="Customer Portal" subtitle="Phase 2 connection" showBack onBack={() => navigate('Home')} />
      <View style={styles.portalCard}>
        <View style={styles.portalIcon}><Text style={styles.portalIconText}>AW</Text></View>
        <Text style={styles.portalTitle}>Your coverage, right in your pocket.</Text>
        <Text style={styles.portalCopy}>The next phase will connect customers to their vehicle, contract, documents, payment information, and claim status. This screen is intentionally not accepting credentials until the secure customer backend is connected.</Text>
        <View style={styles.portalList}>
          <PortalItem text="View vehicle and coverage" />
          <PortalItem text="Open policy documents" />
          <PortalItem text="Track claims and repairs" />
          <PortalItem text="Manage account information" />
          <PortalItem text="Receive important notifications" />
        </View>
        <PrimaryButton label="Contact Auto Wrap" onPress={() => navigate('Contact')} />
      </View>
    </ScrollView>
  );
}

function PortalItem({ text }) {
  return <View style={styles.portalItem}><Text style={styles.portalCheck}>✓</Text><Text style={styles.portalItemText}>{text}</Text></View>;
}

function MoreScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={styles.screenContent} showsVerticalScrollIndicator={false}>
      <Header title="More" subtitle="Auto Wrap Coverage" />
      <MenuRow title="About Auto Wrap" subtitle="Who we are and how it works" onPress={() => navigate('About')} />
      <MenuRow title="Contact Us" subtitle={contact.phoneDisplay} onPress={() => navigate('Contact')} />
      <MenuRow title="Customer Portal" subtitle="Account access is the next phase" onPress={() => navigate('Portal')} />
      <MenuRow title="Visit Website" subtitle="AutoWrapCoverage.com" onPress={() => openUrl(contact.website)} />
      <MenuRow title="Terms of Service" subtitle="View the current website terms" onPress={() => openUrl(`${contact.website}terms-of-service`)} />
      <MenuRow title="Privacy Policy" subtitle="View the current website privacy policy" onPress={() => openUrl(`${contact.website}privacy-policy`)} />
      <View style={styles.disclosureCard}>
        <Text style={styles.disclosureText}>Auto Wrap is an independent seller/provider of vehicle service contract options. Contract availability and terms depend on eligibility and the applicable administrator/service contract.</Text>
      </View>
    </ScrollView>
  );
}

function MenuRow({ title, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuRow, pressed && styles.pressed]}>
      <View style={styles.menuRowText}><Text style={styles.menuRowTitle}>{title}</Text><Text style={styles.menuRowSubtitle}>{subtitle}</Text></View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const tabs = [
  { key: 'Home', label: 'Home', icon: '⌂' },
  { key: 'Plans', label: 'Plans', icon: '▦' },
  { key: 'Quote', label: 'Quote', icon: '$' },
  { key: 'FAQ', label: 'FAQ', icon: '?' },
  { key: 'More', label: 'More', icon: '•••' },
];

export default function App() {
  const [screen, setScreen] = useState('Home');
  const navigate = (next) => setScreen(next);

  let content;
  if (screen === 'Plans') content = <PlansScreen navigate={navigate} />;
  else if (screen === 'Quote') content = <QuoteScreen />;
  else if (screen === 'FAQ') content = <FaqScreen />;
  else if (screen === 'More') content = <MoreScreen navigate={navigate} />;
  else if (screen === 'Contact') content = <ContactScreen />;
  else if (screen === 'About') content = <AboutScreen navigate={navigate} />;
  else if (screen === 'Claims') content = <ClaimsScreen navigate={navigate} />;
  else if (screen === 'Portal') content = <PortalScreen navigate={navigate} />;
  else content = <HomeScreen navigate={navigate} />;

  const currentTab = tabs.some((t) => t.key === screen) ? screen : screen === 'Contact' || screen === 'About' || screen === 'Portal' ? 'More' : 'Home';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.paper} />
      <View style={styles.app}>{content}</View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = currentTab === tab.key;
          return (
            <Pressable key={tab.key} onPress={() => navigate(tab.key)} style={styles.tabItem} accessibilityRole="button" accessibilityLabel={tab.label}>
              <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.paper },
  app: { flex: 1 },
  screenContent: { padding: 18, paddingBottom: 36 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.995 }] },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, minHeight: 58 },
  headerLogo: { width: 72, height: 52, marginRight: 12 },
  headerTextWrap: { flex: 1 },
  headerTitle: { color: colors.ink, fontSize: 26, fontWeight: '900', letterSpacing: -0.4 },
  headerSubtitle: { color: colors.muted, fontSize: 13, marginTop: 2 },
  backButton: { width: 46, height: 46, borderRadius: 14, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  backButtonText: { color: colors.white, fontSize: 36, marginTop: -5 },
  hero: { backgroundColor: colors.ink, borderRadius: 26, padding: 24, overflow: 'hidden', marginBottom: 26 },
  heroLogo: { width: 124, height: 90, marginBottom: 18, backgroundColor: colors.white, borderRadius: 14 },
  heroEyebrow: { color: '#F1D7C8', fontSize: 12, fontWeight: '800', letterSpacing: 2.1, marginBottom: 8 },
  heroTitle: { color: colors.white, fontSize: 40, lineHeight: 43, fontWeight: '900', letterSpacing: -1.2 },
  heroCopy: { color: '#D8D3CC', fontSize: 15, lineHeight: 22, marginTop: 14, marginBottom: 20 },
  heroButtonRow: { gap: 10 },
  primaryButton: { minHeight: 50, borderRadius: 15, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 14 },
  primaryButtonLight: { backgroundColor: colors.cream },
  primaryButtonText: { color: colors.white, fontWeight: '900', fontSize: 16 },
  primaryButtonTextDark: { color: colors.ink },
  secondaryButton: { minHeight: 48, borderRadius: 15, borderWidth: 1.3, borderColor: '#777169', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 13 },
  secondaryButtonText: { color: colors.white, fontWeight: '800', fontSize: 15 },
  section: { marginBottom: 26 },
  sectionKicker: { color: colors.red, fontWeight: '900', letterSpacing: 1.8, fontSize: 11, marginBottom: 5 },
  sectionTitle: { color: colors.ink, fontWeight: '900', fontSize: 27, lineHeight: 31, letterSpacing: -0.5, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  quickCard: { width: '48.5%', minHeight: 142, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 15 },
  quickMarker: { width: 34, height: 28, borderRadius: 9, backgroundColor: '#F4E5E0', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  quickMarkerText: { color: colors.red, fontSize: 11, fontWeight: '900' },
  quickTitle: { fontSize: 17, fontWeight: '900', color: colors.ink, marginBottom: 5 },
  quickSubtitle: { color: colors.muted, fontSize: 12.5, lineHeight: 18 },
  darkFeature: { backgroundColor: colors.charcoal, borderRadius: 22, padding: 22, marginBottom: 28 },
  darkFeatureTitle: { color: colors.white, fontWeight: '900', fontSize: 25, lineHeight: 30, marginTop: 14, marginBottom: 10 },
  darkFeatureCopy: { color: '#D4D0C9', fontSize: 14.5, lineHeight: 22 },
  inlineLinkButton: { marginTop: 16 },
  inlineLinkText: { color: '#F3D070', fontWeight: '800', fontSize: 14 },
  pill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  pillRed: { backgroundColor: '#F4E0DB' },
  pillGreen: { backgroundColor: '#DDF0E7' },
  pillCream: { backgroundColor: colors.cream },
  pillText: { color: colors.ink, fontSize: 10.5, fontWeight: '900', letterSpacing: 1.3 },
  planPreview: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 18, marginBottom: 10, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  planStripe: { width: 6, alignSelf: 'stretch', backgroundColor: colors.red },
  planPreviewBody: { flex: 1, padding: 15 },
  planPreviewTitle: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  planPreviewCopy: { color: colors.muted, fontSize: 12.5, marginTop: 4 },
  planPreviewPrice: { color: colors.red, fontSize: 12.5, fontWeight: '800', marginTop: 8 },
  chevron: { fontSize: 30, color: colors.muted, paddingRight: 15 },
  noticeCard: { backgroundColor: '#FFF9E8', borderColor: '#E6D8A7', borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 16 },
  noticeTitle: { color: colors.ink, fontWeight: '900', fontSize: 15, marginBottom: 5 },
  noticeCopy: { color: '#5D594F', fontSize: 13, lineHeight: 19 },
  planCard: { backgroundColor: colors.white, borderRadius: 22, padding: 20, borderWidth: 1, borderColor: colors.line, marginBottom: 16 },
  planNumber: { width: 42, height: 32, borderRadius: 10, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  planNumberText: { color: colors.white, fontWeight: '900', fontSize: 12 },
  planCardTitle: { fontSize: 25, fontWeight: '900', color: colors.ink },
  planCardSummary: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 6 },
  rule: { height: 1, backgroundColor: colors.line, marginVertical: 16 },
  planLabel: { color: colors.muted, fontSize: 10.5, fontWeight: '900', letterSpacing: 1.5, marginBottom: 4, marginTop: 10 },
  planDetail: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  planPrice: { color: colors.red, fontWeight: '900', fontSize: 16, marginBottom: 17 },
  quoteIntro: { backgroundColor: colors.charcoal, borderRadius: 20, padding: 20, marginBottom: 18 },
  quoteIntroTitle: { color: colors.white, fontWeight: '900', fontSize: 22, lineHeight: 27 },
  quoteIntroCopy: { color: '#D1CDC7', fontSize: 13, lineHeight: 19, marginTop: 8 },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { color: colors.ink, fontSize: 12, fontWeight: '900', marginBottom: 7 },
  input: { minHeight: 50, backgroundColor: colors.white, borderWidth: 1, borderColor: '#D5D0C8', borderRadius: 14, paddingHorizontal: 14, color: colors.ink, fontSize: 15 },
  twoCol: { flexDirection: 'row', justifyContent: 'space-between' },
  half: { width: '48%' },
  helperText: { color: colors.muted, textAlign: 'center', marginTop: 12, fontSize: 12 },
  faqCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 16, marginBottom: 10, overflow: 'hidden' },
  faqQuestion: { minHeight: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 17, paddingVertical: 14 },
  faqQuestionText: { flex: 1, color: colors.ink, fontWeight: '800', fontSize: 15.5, paddingRight: 12 },
  faqToggle: { color: colors.red, fontWeight: '300', fontSize: 26 },
  faqAnswerWrap: { borderTopWidth: 1, borderTopColor: colors.line, padding: 17, backgroundColor: '#FAF8F4' },
  faqAnswer: { color: '#4D4943', fontSize: 14, lineHeight: 21 },
  redLink: { color: colors.red, fontWeight: '900', marginTop: 12 },
  contactHero: { backgroundColor: colors.ink, borderRadius: 22, padding: 22, marginBottom: 16 },
  contactHeroTitle: { color: colors.white, fontWeight: '900', fontSize: 25 },
  contactHeroCopy: { color: '#D4D0C9', fontSize: 14, lineHeight: 21, marginTop: 8 },
  contactCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 18, padding: 18, marginBottom: 11 },
  contactLabel: { color: colors.red, fontWeight: '900', fontSize: 10.5, letterSpacing: 1.5 },
  contactValue: { color: colors.ink, fontWeight: '900', fontSize: 18, lineHeight: 24, marginTop: 7 },
  contactAction: { color: colors.muted, fontWeight: '700', fontSize: 12.5, marginTop: 8 },
  contactFooterCard: { backgroundColor: '#F1ECE5', borderRadius: 17, padding: 17, marginTop: 5 },
  contactFooterTitle: { color: colors.ink, fontWeight: '900', fontSize: 16 },
  contactFooterCopy: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5 },
  aboutHero: { backgroundColor: colors.ink, borderRadius: 22, padding: 21, marginBottom: 18 },
  aboutLogo: { width: 110, height: 80, backgroundColor: colors.white, borderRadius: 13, marginBottom: 16 },
  aboutTitle: { color: colors.white, fontSize: 26, lineHeight: 31, fontWeight: '900' },
  bodyText: { color: colors.text, fontSize: 15, lineHeight: 24, marginBottom: 14 },
  disclosureCard: { backgroundColor: '#ECE8E0', borderRadius: 16, padding: 16, marginTop: 8 },
  disclosureTitle: { color: colors.ink, fontWeight: '900', fontSize: 14, marginBottom: 5 },
  disclosureText: { color: '#57534D', fontSize: 12.5, lineHeight: 19 },
  claimsCard: { backgroundColor: colors.ink, borderRadius: 22, padding: 22, marginBottom: 16 },
  claimsTitle: { color: colors.white, fontWeight: '900', fontSize: 27, lineHeight: 32, marginTop: 15 },
  claimsCopy: { color: '#D3CEC7', fontSize: 14, lineHeight: 21, marginTop: 10, marginBottom: 18 },
  buttonSpacer: { height: 10 },
  portalCard: { backgroundColor: colors.white, borderRadius: 24, padding: 22, borderWidth: 1, borderColor: colors.line },
  portalIcon: { width: 72, height: 72, borderRadius: 22, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  portalIconText: { color: colors.red, fontWeight: '900', fontSize: 22 },
  portalTitle: { color: colors.ink, fontWeight: '900', fontSize: 27, lineHeight: 32 },
  portalCopy: { color: colors.muted, fontSize: 14, lineHeight: 21, marginTop: 9 },
  portalList: { marginVertical: 20, gap: 11 },
  portalItem: { flexDirection: 'row', alignItems: 'center' },
  portalCheck: { width: 25, color: colors.green, fontWeight: '900', fontSize: 16 },
  portalItemText: { flex: 1, color: colors.ink, fontSize: 14, fontWeight: '700' },
  menuRow: { minHeight: 74, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line, borderRadius: 17, paddingLeft: 17, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  menuRowText: { flex: 1 },
  menuRowTitle: { color: colors.ink, fontWeight: '900', fontSize: 15.5 },
  menuRowSubtitle: { color: colors.muted, fontSize: 12.5, marginTop: 4 },
  tabBar: { flexDirection: 'row', backgroundColor: colors.ink, borderTopWidth: 1, borderTopColor: '#343434', paddingTop: 8, paddingBottom: Platform.OS === 'ios' ? 7 : 9, paddingHorizontal: 5 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 52 },
  tabIcon: { color: '#8F8A83', fontSize: 18, fontWeight: '900', height: 24 },
  tabIconActive: { color: colors.red },
  tabLabel: { color: '#9A958D', fontSize: 10.5, fontWeight: '700', marginTop: 2 },
  tabLabelActive: { color: colors.white, fontWeight: '900' },
});
