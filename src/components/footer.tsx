import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="flex flex-row">
      <div>
        <div>
          <div className="flex flex-row">
            <div>
              <Button variant="ghost">About</Button>
            </div>
            <div className="footer__link">
              <Button variant="ghost">Contact</Button>
            </div>
            <div className="footer__link">
              <Button variant="ghost">Terms of Use</Button>
            </div>
            <div className="footer__link">
              <Button variant="ghost">Privacy Policy</Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
