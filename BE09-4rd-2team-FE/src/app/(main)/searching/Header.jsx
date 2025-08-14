'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './Header.css';

export default function Header({ selected = '글' }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const router = useRouter();

  const options = ['글', '블로그', '별명.아이디'];

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleSelect = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = e => {
    e.preventDefault();

    // 선택된 옵션과 검색어를 쿼리스트링으로 전달
    const encodedOption = encodeURIComponent(selectedOption);
    const encodedQuery = encodeURIComponent(searchQuery);
    router.push(`/searchResult?mode=${encodedOption}&query=${encodedQuery}`);
  };

  return (
    <header className="header-common">
      <div className="inner">
        <div className="area-logo">
          <a className="link-naver" href="http://www.naver.com">
            <span className="blind">blog</span>
          </a>
          <a className="link-blog" href="/">
            <span className="blind">naver</span>
          </a>
        </div>
        <div className="area-search" role="search">
          <form onSubmit={handleSearch}>
            <fieldset className="fieldset">
              <div className="search">
                <div className="area-dropdown" data-set="search" ref={dropdownRef}>
                  <a
                    href="#"
                    className="selected-option"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    onClick={e => {
                      e.preventDefault();
                      toggleDropdown();
                    }}
                  >
                    {selectedOption}
                    <i className="sp-common icon-arrow">
                      <span className="blind">검색모드 펼치기</span>
                    </i>
                  </a>
                  {isDropdownOpen && (
                    <div className="dropdown-select">
                      {options.map(option => (
                        <div key={option}>
                          <a
                            href="#"
                            className={`item${selectedOption === option ? ' selected' : ''}`}
                            role="option"
                            aria-selected={selectedOption === option}
                            onClick={e => {
                              e.preventDefault();
                              handleSelect(option);
                            }}
                          >
                            {option}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name="sectionBlogQuery"
                  className="textbox"
                  title="검색어를 입력하고 버튼을 누르세요"
                  maxLength="255"
                  autoComplete="off"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder=""
                />
              </div>
              <button type="submit" className="button button-blog" aria-label="검색">
                <i className="sp-common icon-search"></i>
              </button>
              <a
                href={`http://search.naver.com/search.naver?sm=sta_hty.blog&ie=utf8&query=${encodeURIComponent(searchQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-naver"
                role="button"
                aria-label="네이버 통합검색"
              >
                통합검색
              </a>
            </fieldset>
          </form>
        </div>
      </div>
    </header>
  );
}
